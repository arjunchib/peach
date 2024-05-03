import type { BunFile, udp } from "bun";
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
  VoiceSelectProtocolEvent,
  VoiceSessionDescriptionEvent,
  VoiceSpeakingEvent,
  EncryptionMode,
} from "../interfaces/voice";
import { GatewayService } from "../services/gateway_service";
import { logger } from "../logger";
import { secretbox, randomBytes } from "tweetnacl";
import { WebmOpusDemuxer } from "./webm-opus-demuxer";

const CHANNELS = 2;
const TIMESTAMP_INC = (48_000 / 100) * CHANNELS;
const MAX_NONCE_SIZE = 2 ** 32 - 1;

function randomNBit(numberOfBits: number) {
  return Math.floor(Math.random() * 2 ** numberOfBits);
}

export class VoiceConnection {
  private gatewayService = inject(GatewayService);

  private sessionId?: string;
  private token?: string;
  private guildId?: string;
  private endpoint?: string;
  private ws?: WebSocket;
  private udp?: udp.Socket<"buffer">;
  private heartbeatTimer?: Timer;
  private ssrc?: number;
  private udpMode?: "discovery" | "voice";
  private myIp?: string;
  private destIp?: string;
  private port?: number;
  private availableModes?: EncryptionMode[];
  private encryptionMode?: EncryptionMode;
  private secretKey?: Uint8Array;
  private sequence = randomNBit(16);
  private timestamp = randomNBit(32);
  private nonce = 0;
  private audioTimer?: Timer;
  private cb?: (voiceConn: VoiceConnection) => void;

  constructor(
    options: VoiceStateUpdateSendEvent["d"],
    cb?: (voiceConn: VoiceConnection) => void
  ) {
    this.gatewayService.sendVoiceStateUpdate(options);
    this.gatewayService.on(
      "VOICE_STATE_UPDATE",
      this.onVoiceStateUpdate.bind(this)
    );
    this.gatewayService.on(
      "VOICE_SERVER_UPDATE",
      this.onVoiceServerUpdate.bind(this)
    );
    this.cb = cb;
  }

  playAudio(data: BunFile | ReadableStream) {
    return new Promise<void>((resolve) => {
      if (!(data instanceof ReadableStream)) {
        data = data.stream();
      }
      this.setSpeaking(1);
      const rs = data.pipeThrough(new WebmOpusDemuxer());
      const reader = rs.getReader();
      let silenceCount = 0;
      this.audioTimer = setInterval(async () => {
        const chunk = await reader.read();
        if (chunk.done) {
          if (silenceCount++ < 5) {
            this.sendAudioPacket(
              new Uint8Array(new Uint32Array([0xf8, 0xff, 0xfe]))
            );
          } else {
            clearInterval(this.audioTimer);
            reader.releaseLock();
            this.setSpeaking(0);
            resolve();
          }
        } else {
          this.sendAudioPacket(chunk.value);
        }
      }, 15);
    });
  }

  disconnect() {
    this.gatewayService.sendVoiceStateUpdate({
      guild_id: this.guildId!,
      channel_id: null,
      self_deaf: false,
      self_mute: false,
    });
    this.udp?.close();
    this.ws?.close();
    clearInterval(this.audioTimer);
    clearInterval(this.heartbeatTimer);
  }

  private setSpeaking(speaking: number) {
    if (!this.ssrc) throw new Error("no ssrc");
    this.send<VoiceSpeakingEvent>({
      op: 5,
      d: { speaking, delay: 0, ssrc: this.ssrc },
    });
  }

  private sendAudioPacket(opusPacket: Uint8Array) {
    const packet = this.createAudioPacket(opusPacket);
    this.udp?.send(packet, this.port!, this.destIp!);
  }

  private createAudioPacket(opusPacket: Uint8Array) {
    const header = new Uint8Array(12);
    const headerView = new DataView(header.buffer);
    headerView.setUint8(0, 0x80);
    headerView.setUint8(1, 0x78);
    headerView.setUint16(2, this.sequence!);
    headerView.setUint32(4, this.timestamp!);
    headerView.setUint32(8, this.ssrc!);

    this.sequence!++;
    this.timestamp! += TIMESTAMP_INC;
    if (this.sequence! >= 2 ** 16) this.sequence = 0;
    if (this.timestamp! >= 2 ** 32) this.timestamp = 0;

    return Uint8Array.from([
      ...header,
      ...this.encryptOpusPacket(opusPacket, header),
    ]);
  }

  private encryptOpusPacket(opusPacket: Uint8Array, rtpHeader?: Uint8Array) {
    if (!this.secretKey) {
      throw new Error("No secret key");
    }
    if (this.encryptionMode === "xsalsa20_poly1305_lite") {
      this.nonce++;
      if (this.nonce > MAX_NONCE_SIZE) this.nonce = 0;
      const nonceBuffer = new Uint8Array(24);
      const nonceView = new DataView(nonceBuffer.buffer);
      nonceView.setUint32(0, this.nonce);
      return new Uint8Array([
        ...secretbox(opusPacket, nonceBuffer, this.secretKey),
        ...nonceBuffer.slice(0, 4),
      ]);
    } else if (this.encryptionMode === "xsalsa20_poly1305_suffix") {
      const random = randomBytes(24);
      return new Uint8Array([
        ...secretbox(opusPacket, random, this.secretKey),
        ...random,
      ]);
    }

    if (!rtpHeader) {
      throw new Error("No RTP header");
    }

    return secretbox(
      opusPacket,
      new Uint8Array([...rtpHeader, ...new Uint8Array(12)]),
      this.secretKey
    );
  }

  private send<T extends VoiceGatewayEvent>(event: T) {
    logger.voice("Websocket sent", event);
    this.ws?.send(JSON.stringify(event));
  }

  private onVoiceStateUpdate(event: VoiceStateUpdateRecvEvent) {
    this.sessionId = event.d.session_id;
    this.connect();
  }

  private onVoiceServerUpdate(event: VoiceServerUpdateEvent) {
    this.token = event.d.token;
    this.guildId = event.d.guild_id;
    this.endpoint = event.d.endpoint;
    this.connect();
  }

  private connect() {
    if (
      this.sessionId &&
      this.token &&
      this.guildId &&
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
    }
  }

  private async handleMessage(message: MessageEvent) {
    const event: VoiceGatewayEvent = JSON.parse(message.data);
    logger.voice("Websocket receive", event);
    switch (event.op) {
      case 2: // ready
        return await this.handleReady(event);
      case 4: //session description
        return this.handleSessionDescription(event);
      case 8: // hello
        return this.handleHello(event);
    }
  }

  private handleOpen() {
    // these values have already been checked
    this.send<VoiceIdentifyEvent>({
      op: 0,
      d: {
        server_id: this.guildId!,
        user_id: this.gatewayService.readyEventPayload!.user.id,
        session_id: this.sessionId!,
        token: this.token!,
      },
    });
  }

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
    this.ssrc = event.d.ssrc;
    this.destIp = event.d.ip;
    this.port = event.d.port;
    this.availableModes = event.d.modes;
    this.udp = await Bun.udpSocket({
      socket: {
        data: (socket, buf, port, addr) => {
          if (this.udpMode === "discovery") {
            this.myIp = buf.toString("ascii", 8, 72);
            logger.voice("My IP is", this.myIp);
            this.selectProtocol();
            this.udpMode = "voice";
          }
        },
        error(socket, error) {
          console.error(error);
        },
        drain(socket) {
          logger.voice("UDP drain");
        },
      },
    });
    this.discoverIpAddress();
  }

  private handleSessionDescription(event: VoiceSessionDescriptionEvent) {
    this.encryptionMode = event.d.mode;
    this.secretKey = new Uint8Array(event.d.secret_key);
    this.cb?.(this);
  }

  private heartbeat() {
    this.send<VoiceHeartbeatEvent>({
      op: 3,
      d: this.heartbeatNonce(),
    });
  }

  private heartbeatNonce() {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0];
  }

  private discoverIpAddress() {
    this.udpMode = "discovery";
    const buffer = new ArrayBuffer(74);
    const view = new DataView(buffer);
    view.setUint16(0, 0x1, false);
    view.setUint16(2, 70, false);
    view.setUint32(4, this.ssrc!, false);
    view.setUint16(72, this.port!, false);
    this.udp?.send(buffer, this.port!, this.destIp!);
  }

  private selectProtocol() {
    if (!this.myIp) throw new Error("No IP address");
    if (!this.udp?.port) throw new Error("No UDP Port");
    this.send<VoiceSelectProtocolEvent>({
      op: 1,
      d: {
        protocol: "udp",
        data: {
          address: this.myIp,
          port: this.udp.port,
          mode: this.preferredEncryptionMode(),
        },
      },
    });
  }

  private preferredEncryptionMode(): EncryptionMode {
    if (this.availableModes?.includes("xsalsa20_poly1305_lite")) {
      return "xsalsa20_poly1305_lite";
    } else if (this.availableModes?.includes("xsalsa20_poly1305_suffix")) {
      return "xsalsa20_poly1305_suffix";
    } else {
      throw new Error("No supported modes available!");
    }
  }
}
