import { APP_CONFIG, type AppConfig } from "../bootstrap";
import { inject } from "../injector";
import type {
  DispatchEvent,
  GatewayEvent,
  HeartbeatEvent,
  HelloEvent,
  IdentifyEvent,
  InvalidSessionEvent,
  ResumeEvent,
} from "../interfaces/gateway_events";
import { DiscordRestService } from "./discord_rest_service";
import { RouterService } from "./router_service";

const RESUMABLE_CLOSE_CODES = [4000, 4001, 4002, 4003, 4005, 4007, 4008, 4009];

export class GatewayService {
  private config = inject(APP_CONFIG);
  private discordRestService = inject(DiscordRestService);
  private routerService = inject(RouterService);

  private gatewayUrl?: string;
  private ws?: WebSocket;
  private heartbeatTimer?: Timer;
  private sequenceNumber: number | null = null;
  private acked = true; // ack not required for first heartbeat
  private resumeGatewayUrl?: string;
  private sessionId?: string;
  private heartbeatIntervalMs?: number;

  async init(
    configToken: AppConfig,
    discordRestServiceToken: DiscordRestService,
    routerServiceToken: RouterService
  ) {
    // check if we hot reloaded by seeing if a websocket connection exists
    if (this.ws) {
      if (this.config.debug) console.log("Reusing gateway");
      this.config = configToken;
      this.discordRestService = discordRestServiceToken;
      this.routerService = routerServiceToken;
    } else {
      if (this.config.debug) console.log("Connecting to new gateway");
      await this.connect();
    }
  }

  private async connect() {
    if (this.ws) return; // do nothing if already connected
    const { url } = await this.discordRestService.getGateway();
    this.gatewayUrl = url;
    this.connectWebSocket(url);
  }

  private resume() {
    if (!this.resumeGatewayUrl) {
      clearInterval(this.heartbeatTimer);
      throw new Error("Can't resume without resumable gateway url");
    }
    if (!this.sessionId) {
      clearInterval(this.heartbeatTimer);
      throw new Error("Can't resume without resumable gateway url");
    }
    if (!this.sequenceNumber) {
      clearInterval(this.heartbeatTimer);
      throw new Error("Can't resume without sequence number");
    }
    this.disconnect();
    this.connectWebSocket(this.resumeGatewayUrl);
    this.send<ResumeEvent>({
      op: 6,
      d: {
        token: this.config.token,
        session_id: this.sessionId,
        seq: this.sequenceNumber,
      },
    });
  }

  private reconnect() {
    this.disconnect(1000);
    if (!this.gatewayUrl) {
      clearInterval(this.heartbeatTimer);
      throw new Error("Can't reconnect without gateway url");
    }
    this.connectWebSocket(this.gatewayUrl);
  }

  private disconnect(code?: number) {
    if (this.ws) {
      this.ws.close(code);
    }
  }

  private connectWebSocket(url: string) {
    this.ws = new WebSocket(url);
    this.ws.addEventListener("message", this.handleMessage.bind(this));
    this.ws.addEventListener("open", (event) => {
      if (this.config.debug) console.log("Open");
    });
    this.ws.addEventListener("close", this.handleClose.bind(this));
    this.ws.addEventListener("error", (event) => {
      console.error(event);
    });
  }

  private send<T extends GatewayEvent>(event: T) {
    if (this.config.debug) console.log("Sent\n", event);
    this.ws?.send(JSON.stringify(event));
  }

  private handleClose(event: CloseEvent) {
    if (this.config.debug) console.log("Closed with", event.code);
    if (!event.code || RESUMABLE_CLOSE_CODES.includes(event.code)) {
      this.resume();
    }
  }

  private async handleMessage(event: MessageEvent) {
    const payload: GatewayEvent = JSON.parse(event.data);
    this.sequenceNumber = payload.s ?? null;
    if (this.config.debug) {
      console.log("Recv\n", payload);
    }
    switch (payload.op) {
      case 0:
        return await this.handleDispatch(payload);
      case 1:
        return this.sendHeartbeat();
      case 7:
        return this.resume();
      case 9:
        return this.handleInvalidSession(payload);
      case 10:
        return this.handleHello(payload);
      case 11:
        return this.handleHeartbeatAck();
    }
  }

  private async handleDispatch(event: DispatchEvent) {
    if (event.t === "READY") {
      this.sessionId = event.d.session_id;
      this.resumeGatewayUrl = event.d.resume_gateway_url;
    } else if (event.t === "INTERACTION_CREATE") {
      await this.routerService.routeTo(event.d);
    }
  }

  private handleInvalidSession(event: InvalidSessionEvent) {
    if (event.d) {
      this.resume();
    } else {
      this.reconnect();
    }
  }

  private handleHello(event: HelloEvent) {
    // ensure we only have one timer
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatIntervalMs = event.d.heartbeat_interval;
    this.heartbeatTimer = setTimeout(
      this.handleFirstHeartbeat.bind(this),
      this.heartbeatIntervalMs * Math.random()
    );
    this.sendIdentify();
  }

  private handleFirstHeartbeat() {
    this.sendHeartbeat();
    if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(
      this.sendHeartbeat.bind(this),
      this.heartbeatIntervalMs
    );
  }

  private handleHeartbeatAck() {
    this.acked = true;
  }

  private sendHeartbeat() {
    if (!this.ws) {
      clearInterval(this.heartbeatTimer);
      throw new Error("No websocket!");
    }
    if (!this.acked) {
      if (this.config.debug) console.log("Ack was not received");
      this.ws.close(1002);
      clearInterval(this.heartbeatTimer);
      this.resume();
    }
    this.acked = false;
    this.send<HeartbeatEvent>({
      op: 1,
      d: this.sequenceNumber,
    });
  }

  private sendIdentify() {
    if (!this.ws) {
      clearInterval(this.heartbeatTimer);
      throw new Error("No websocket!");
    }
    this.send<IdentifyEvent>({
      op: 2,
      d: {
        token: this.config.token,
        properties: {
          os: "linux", // TODO: get OS
          browser: "blurp",
          device: "blurp",
        },
        intents: this.config.intents ?? 0,
      },
    });
  }
}
