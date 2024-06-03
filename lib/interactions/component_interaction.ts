import type { BaseButton } from "../components/base_button";
import type {
  DiscordInteraction,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import { Interaction } from "./interaction";

export class ComponentInteraction extends Interaction {
  constructor(raw: DiscordInteraction) {
    super(raw);
  }

  async respondWith(
    response: string | MessageInteractionResponseData | BaseButton[][]
  ) {
    if (typeof response === "string") {
      response = { content: response };
    }
    if (Array.isArray(response)) {
      const components = response.map((row) => {
        const components = row.map((comp) => comp.toComponent());
        return { type: 1, components };
      });
      response = { content: "", components };
    }
    await this.discordRestService.createInteractionResponse(
      this.raw.id,
      this.raw.token,
      { type: 7, data: response }
    );
  }
}
