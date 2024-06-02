import { SlashCommand } from "../commands/slash_command";
import type {
  DiscordInteraction,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Interaction } from "./interaction";

export class SlashInteraction<T> extends Interaction {
  options: T = {} as T;

  constructor(
    raw: DiscordInteraction,
    private command: SlashCommand | SubcommandGroupOption | SubcommandOption
  ) {
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
    for (const option of this.getRawOptions() ?? []) {
      if (option.type === 6) {
        const user = this.raw.data?.resolved?.users?.[option.value as any];
        (this.options as any)[option.name] = user;
      } else {
        (this.options as any)[option.name] = option.value;
      }
    }
  }

  private getRawOptions() {
    if (this.command instanceof SlashCommand) {
      return this.raw.data?.options;
    } else if (this.command instanceof SubcommandGroupOption) {
      return this.raw.data?.options?.[0].options;
    } else {
      return this.raw.data?.options?.[0]?.options?.[0].options;
    }
  }
}
