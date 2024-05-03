import { APP_CONFIG, type AppConfig } from "../bootstrap";
import { inject } from "../injector";
import type {
  DispatchEvent,
  GatewayEvent,
  HeartbeatEvent,
  HelloEvent,
  IdentifyEvent,
  InvalidSessionEvent,
  ReadyEvent,
  ResumeEvent,
  VoiceStateUpdateSendEvent,
} from "../interfaces/gateway_events";
import { logger } from "../logger";
import { DiscordRestService } from "./discord_rest_service";
import { RouterService } from "./router_service";
import { StoreService } from "./store_service";

const RESUMABLE_CLOSE_CODES = [4000, 4001, 4002, 4003, 4005, 4007, 4008, 4009];

export class GatewayService {
  private config = inject(APP_CONFIG);
  private discordRestService = inject(DiscordRestService);
  private routerService = inject(RouterService);
  private storeService = inject(StoreService);

  public readyEventPayload?: ReadyEvent["d"];

  private gatewayUrl?: string;
  private ws?: WebSocket;
  private heartbeatTimer?: Timer;
  private sequenceNumber: number | null = null;
  private acked = true; // ack not required for first heartbeat
  private resumeGatewayUrl?: string;
  private sessionId?: string;
  private heartbeatIntervalMs?: number;
  private resumeOnOpen?: boolean;
  private skipIdentify?: boolean;
  private eventListeners = new Map<
    string,
    (event: DispatchEvent) => Promise<void> | void
  >();

  async init(
    config: AppConfig,
    discordRestService: DiscordRestService,
    routerService: RouterService,
    storeService: StoreService
  ) {
    const { resumeGatewayUrl, sessionId, sequenceNumber } =
      this.storeService.store;
    // check if we hot reloaded by seeing if a websocket connection exists
    if (this.ws) {
      logger.gateway("Reusing gateway");
      this.config = config;
      this.discordRestService = discordRestService;
      this.routerService = routerService;
      this.storeService = storeService;
    } else if (resumeGatewayUrl && sessionId && sequenceNumber) {
      logger.gateway("Resuming gateway");
      this.resumeGatewayUrl = resumeGatewayUrl;
      this.sessionId = sessionId;
      this.sequenceNumber = sequenceNumber;
      this.resume();
    } else {
      logger.gateway("Connecting to new gateway");
      await this.connect();
    }
  }

  sendVoiceStateUpdate(payload: VoiceStateUpdateSendEvent["d"]) {
    this.send<VoiceStateUpdateSendEvent>({
      op: 4,
      d: payload,
    });
  }

  on<T extends DispatchEvent>(
    event: T["t"],
    fn: (event: T) => Promise<void> | void
  ) {
    this.eventListeners.set(event, fn as any);
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
    this.disconnect();
    this.connectWebSocket(this.resumeGatewayUrl);
    this.resumeOnOpen = true;
  }

  private async reconnect() {
    this.disconnect(1000);
    if (!this.gatewayUrl) {
      // could end up without a gateway url if we start the service by resuming
      const { url } = await this.discordRestService.getGateway();
      this.gatewayUrl = url;
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
    this.ws.addEventListener("open", this.handleOpen.bind(this));
    this.ws.addEventListener("close", this.handleClose.bind(this));
    this.ws.addEventListener("error", (event) => {
      console.error(event);
    });
  }

  private send<T extends GatewayEvent>(event: T) {
    logger.gateway("Websocket sent", event);
    this.ws?.send(JSON.stringify(event));
  }

  private handleOpen() {
    logger.gateway("Open websocket");
    if (this.resumeOnOpen) {
      this.resumeOnOpen = false;
      if (!this.sessionId) {
        clearInterval(this.heartbeatTimer);
        throw new Error("Can't resume without resumable gateway url");
      }
      if (!this.sequenceNumber) {
        clearInterval(this.heartbeatTimer);
        throw new Error("Can't resume without sequence number");
      }
      this.skipIdentify = true;
      this.send<ResumeEvent>({
        op: 6,
        d: {
          token: this.config.token,
          session_id: this.sessionId,
          seq: this.sequenceNumber,
        },
      });
    }
  }

  private handleClose(e: any) {
    const event = e as CloseEvent; // some issue with bun types
    logger.gateway("Websocket closed", event);
    if (!event.code || RESUMABLE_CLOSE_CODES.includes(event.code)) {
      this.resume();
    } else {
      clearInterval(this.heartbeatTimer);
    }
  }

  private async handleMessage(e: any) {
    const event = e as MessageEvent; // some issue with bun types
    const payload: GatewayEvent = JSON.parse(event.data);
    this.sequenceNumber = payload.s ?? null;
    this.storeService.store.sequenceNumber = this.sequenceNumber;
    await this.storeService.save();
    logger.gateway("Websocket received", payload);
    switch (payload.op) {
      case 0:
        return await this.handleDispatch(payload);
      case 1:
        return this.sendHeartbeat();
      case 7:
        return this.resume();
      case 9:
        return await this.handleInvalidSession(payload);
      case 10:
        return this.handleHello(payload);
      case 11:
        return this.handleHeartbeatAck();
    }
  }

  private async handleDispatch(event: DispatchEvent) {
    const fn = this.eventListeners.get(event.t);
    if (fn) {
      await fn(event);
    }
    if (event.t === "READY") {
      this.readyEventPayload = event.d;
      this.sessionId = event.d.session_id;
      this.resumeGatewayUrl = event.d.resume_gateway_url;
      this.storeService.store.sessionId = this.sessionId;
      this.storeService.store.resumeGatewayUrl = this.resumeGatewayUrl;
      await this.storeService.save();
    } else if (event.t === "INTERACTION_CREATE") {
      await this.routerService.routeTo(event.d);
    }
  }

  private async handleInvalidSession(event: InvalidSessionEvent) {
    if (event.d) {
      this.resume();
    } else {
      await this.reconnect();
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
    if (!this.skipIdentify) this.sendIdentify();
    this.skipIdentify = false;
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
      logger.gateway("Ack was not received");
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
