import type { VoiceStateUpdateSendEvent } from "../interfaces/gateway_events";
import { VoiceConnection } from "./voice_connection";

export function joinVoice(options: VoiceStateUpdateSendEvent["d"]) {
  return new Promise<VoiceConnection | null>((resolve, reject) => {
    try {
      return new VoiceConnection(options, (vc) => resolve(vc));
    } catch (e) {
      if (
        e instanceof Error &&
        e.message === "VoiceConnection for this guild already exists"
      ) {
        resolve(null);
      } else {
        reject(e);
      }
    }
  });
}
