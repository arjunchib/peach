import type { udp } from "bun";
import { APP_CONFIG } from "../bootstrap";
import { inject } from "../injector";
import type {
  VoiceServerUpdateEvent,
  VoiceStateUpdateRecvEvent,
  VoiceStateUpdateSendEvent,
} from "../interfaces/gateway_events";
import type {
  VoiceIdentifyEvent,
  VoiceGatewayEvent,
  VoiceHelloEvent,
  VoiceHeartbeatEvent,
  VoiceReadyEvent,
} from "../interfaces/voice";
import { GatewayService } from "./gateway_service";

export class VoiceGatewayService {
  private config = inject(APP_CONFIG);
  private gatewayService = inject(GatewayService);

  private session_id?: string;
  private token?: string;
  private guild_id?: string;
  private endpoint?: string;
  private ws?: WebSocket;
  private udp?: udp.Socket<"buffer">;
  private heartbeatTimer?: Timer;

  init(options: VoiceStateUpdateSendEvent["d"]) {
    this.gatewayService.sendVoiceStateUpdate(options);
    this.gatewayService.on(
      "VOICE_STATE_UPDATE",
      this.onVoiceStateUpdate.bind(this)
    );
    this.gatewayService.on(
      "VOICE_SERVER_UPDATE",
      this.onVoiceServerUpdate.bind(this)
    );
  }

  private send<T extends VoiceGatewayEvent>(event: T) {
    if (this.config.debug) console.log("Sent\n", event);
    this.ws?.send(JSON.stringify(event));
  }

  private onVoiceStateUpdate(event: VoiceStateUpdateRecvEvent) {
    this.session_id = event.d.session_id;
    this.connect();
  }

  private onVoiceServerUpdate(event: VoiceServerUpdateEvent) {
    this.token = event.d.token;
    this.guild_id = event.d.guild_id;
    this.endpoint = event.d.endpoint;
    this.connect();
  }

  private connect() {
    if (
      this.session_id &&
      this.token &&
      this.guild_id &&
      this.endpoint &&
      this.gatewayService.readyEventPayload
    ) {
      this.ws = new WebSocket(`wss://${this.endpoint}?v=4`);
      this.ws.addEventListener("message", this.handleMessage.bind(this));
      this.ws.addEventListener("open", this.handleOpen.bind(this));
      this.ws.addEventListener("close", this.handleClose.bind(this));
      this.ws.addEventListener("error", (event) => {
        console.error(event);
      });
      this.send<VoiceIdentifyEvent>({
        op: 0,
        d: {
          server_id: this.guild_id,
          user_id: this.gatewayService.readyEventPayload.user.id,
          session_id: this.session_id,
          token: this.token,
        },
      });
    }
  }

  private async handleMessage(message: MessageEvent) {
    const event: VoiceGatewayEvent = JSON.parse(message.data);
    switch (event.op) {
      case 2: // ready
        return await this.handleReady(event);
      case 8: // hello
        return this.handleHello(event);
    }
  }

  private handleOpen() {}

  private handleClose() {
    clearInterval(this.heartbeatTimer);
  }

  private handleHello(event: VoiceHelloEvent) {
    this.heartbeatTimer = setInterval(
      this.heartbeat.bind(this),
      event.d.heartbeat_interval
    );
    this.heartbeat();
  }

  private async handleReady(event: VoiceReadyEvent) {
    this.udp = await Bun.udpSocket({
      socket: {
        data(socket, buf, port, addr) {
          console.log(buf.toString("ascii", 8, 72));
        },
        error(socket, error) {
          console.error(error);
        },
        drain(socket) {
          console.log("Draining socket");
        },
      },
    });
    this.discoverIpAddress(event.d);
  }

  private heartbeat() {
    this.send<VoiceHeartbeatEvent>({
      op: 3,
      d: Math.floor(Math.random() * 13),
    });
  }

  private discoverIpAddress(readyPayload: VoiceReadyEvent["d"]) {
    if (this.config.debug) console.log("Discovering IP address");
    const buffer = new ArrayBuffer(74);
    const view = new DataView(buffer);
    view.setUint16(0, 0x1, false);
    view.setUint16(2, 70, false);
    view.setUint32(4, readyPayload.ssrc, false);
    view.setUint16(72, readyPayload.port, false);
    this.udp?.send(buffer, readyPayload.port, readyPayload.ip);
  }
}
