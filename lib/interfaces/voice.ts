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

export interface VoiceIdentifyEvent {
  op: 0;
  d: {
    server_id: string;
    user_id: string;
    session_id: string;
    token: string;
  };
}

export interface VoiceReadyEvent {
  op: 2;
  d: {
    ssrc: number;
    ip: string;
    port: number;
    modes: (
      | "xsalsa20_poly1305"
      | "xsalsa20_poly1305_suffix"
      | "xsalsa20_poly1305_lite"
    )[];
  };
}

export interface VoiceHeartbeatEvent {
  op: 3;
  d: number;
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
  | VoiceReadyEvent
  | VoiceHeartbeatEvent
  | VoiceHeartbeatAckEvent
  | VoiceHelloEvent;
