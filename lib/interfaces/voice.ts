export interface VoiceState {
  guild_id?: string;
  channel_id?: string;
  user_id: string;
  member?: any;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
  request_to_speak_timestamp: string;
}

export type EncryptionMode =
  | "xsalsa20_poly1305"
  | "xsalsa20_poly1305_suffix"
  | "xsalsa20_poly1305_lite";

export interface VoiceIdentifyEvent {
  op: 0;
  d: {
    server_id: string;
    user_id: string;
    session_id: string;
    token: string;
  };
}

export interface VoiceSelectProtocolEvent {
  op: 1;
  d: {
    protocol: "udp";
    data: {
      address: string;
      port: number;
      mode: EncryptionMode;
    };
  };
}

export interface VoiceReadyEvent {
  op: 2;
  d: {
    ssrc: number;
    ip: string;
    port: number;
    modes: EncryptionMode[];
  };
}

export interface VoiceHeartbeatEvent {
  op: 3;
  d: number;
}

export interface VoiceSessionDescriptionEvent {
  op: 4;
  d: {
    mode: EncryptionMode;
    secret_key: number[];
  };
}

export interface VoiceSpeakingEvent {
  op: 5;
  d: {
    speaking: number;
    delay: number;
    ssrc: number;
  };
}

export interface VoiceHeartbeatAckEvent {
  op: 6;
  d: number;
}

export interface VoiceHelloEvent {
  op: 8;
  d: {
    heartbeat_interval: number;
  };
}

export type VoiceGatewayEvent =
  | VoiceIdentifyEvent
  | VoiceSelectProtocolEvent
  | VoiceReadyEvent
  | VoiceHeartbeatEvent
  | VoiceSessionDescriptionEvent
  | VoiceSpeakingEvent
  | VoiceHeartbeatAckEvent
  | VoiceHelloEvent;
