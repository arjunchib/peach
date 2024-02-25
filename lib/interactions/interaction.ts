import { inject } from "../injector";
import type { DiscordInteraction } from "../interfaces/interaction";
import { DiscordRestService } from "../services/discord_rest_service";

export abstract class Interaction {
  private discordRestService = inject(DiscordRestService);

  constructor(public raw: DiscordInteraction) {}

  async respondWith(response: string) {
    await this.discordRestService.createInteractionResponse(
      this.raw.id,
      this.raw.token,
      { type: 4, data: { content: response } }
    );
  }
}
