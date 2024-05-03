import type { VoiceStateUpdateSendEvent } from "../interfaces/gateway_events";
import { VoiceConnection } from "./voice_connection";

export function joinVoice(options: VoiceStateUpdateSendEvent["d"]) {
  return new Promise<VoiceConnection>((resolve) => {
    return new VoiceConnection(options, (voiceConn) => resolve(voiceConn));
  });
}
