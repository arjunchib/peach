import { inject } from "./injector";
import type { VoiceStateUpdateSendEvent } from "./interfaces/gateway_events";
import { VoiceGatewayService } from "./services/voice_gateway_service";

export function joinVoice(options: VoiceStateUpdateSendEvent["d"]) {
  const voiceGatewayService = inject(VoiceGatewayService);
  voiceGatewayService.init(options);
}
