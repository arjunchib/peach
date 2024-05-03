import { inject } from "../injector";
import type { VoiceStateUpdateSendEvent } from "../interfaces/gateway_events";
import { VoiceGatewayService } from "./voice_gateway_service";

export function joinVoice(options: VoiceStateUpdateSendEvent["d"]) {
  const voiceGatewayService = inject(VoiceGatewayService);

  return new Promise<VoiceGatewayService>((resolve) => {
    voiceGatewayService.eventTarget.addEventListener("ready", () =>
      resolve(voiceGatewayService)
    );
    voiceGatewayService.init(options);
  });
}
