import type { DiscordInteraction } from "./interaction";

interface BaseGatewayEvent {
  s?: number;
  t?: string;
}

export interface HeartbeatEvent extends BaseGatewayEvent {
  op: 1;
  d: number | null;
}

export interface IdentifyEvent extends BaseGatewayEvent {
  op: 2;
  d: {
    token: string;
    properties: {
      os: string;
      browser: string;
      device: string;
    };
    compress?: boolean;
    large_threshold?: number;
    shard?: [number, number];
    presence?: {
      activities: {
        name: string;
        type: number;
      }[];
      status: string;
      since: number;
      afk: boolean;
    };
    intents: number;
  };
}

export interface ResumeEvent extends BaseGatewayEvent {
  op: 6;
  d: {
    token: string;
    session_id: string;
    seq: number;
  };
}

export interface ReconnectEvent extends BaseGatewayEvent {
  op: 7;
}

export interface InvalidSessionEvent extends BaseGatewayEvent {
  op: 9;
  d: boolean;
}

export interface HelloEvent extends BaseGatewayEvent {
  op: 10;
  d: {
    heartbeat_interval: number;
  };
}

export interface HeartbeatAckEvent extends BaseGatewayEvent {
  op: 11;
}

export interface ReadyEvent extends BaseGatewayEvent {
  op: 0;
  t: "READY";
  d: {
    session_id: string;
    resume_gateway_url: string;
  };
}

export interface InteractionCreateEvent extends BaseGatewayEvent {
  op: 0;
  t: "INTERACTION_CREATE";
  d: DiscordInteraction;
}

export type DispatchEvent = ReadyEvent | InteractionCreateEvent;

export type GatewayEvent =
  | DispatchEvent
  | HeartbeatEvent
  | IdentifyEvent
  | ResumeEvent
  | ReconnectEvent
  | InvalidSessionEvent
  | HelloEvent
  | HeartbeatAckEvent;
