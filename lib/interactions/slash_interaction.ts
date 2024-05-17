import type { SlashCommand } from "../commands/slash_command";
import type {
  DiscordInteraction,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import type { InteractionOption } from "../options/types";
import { Interaction } from "./interaction";

export class SlashInteraction<T extends SlashCommand> extends Interaction {
  options: InteractionOption<T extends SlashCommand<infer K> ? K : never> =
    {} as any;
  // options: $infer<T["options"]> = {} as any; // set below

  constructor(raw: DiscordInteraction) {
    super(raw);
    this.setOptions();
  }

  async respondWith(response: string | MessageInteractionResponseData) {
    if (typeof response === "string") {
      response = { content: response };
    }
    await this.discordRestService.createInteractionResponse(
      this.raw.id,
      this.raw.token,
      { type: 4, data: response }
    );
  }

  private setOptions() {
    for (const option of this.raw.data?.options ?? []) {
      if (option.type === 6) {
        const user = this.raw.data?.resolved?.users?.[option.value as any];
        (this.options as any)[option.name] = user;
      } else {
        (this.options as any)[option.name] = option.value;
      }
    }
  }
}
