import type { BaseButton } from "../components/base_button";
import type { MessageInteractionResponseData } from "../interfaces/interaction";
import type { Message } from "../interfaces/message";
import { Interaction } from "./interaction";

export interface ComponentInteraction {
  type: 3;
  message: Message;
}

export class ComponentInteraction extends Interaction {
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
    return await this.discordRestService.createInteractionResponse(
      this.id,
      this.token,
      { type: 7, data: response }
    );
  }

  async defer() {
    return await this.discordRestService.createInteractionResponse(
      this.id,
      this.token,
      { type: 6 }
    );
  }
}
