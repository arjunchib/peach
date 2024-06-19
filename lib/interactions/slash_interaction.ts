import { SlashCommand } from "../commands/slash_command";
import type { BaseButton } from "../components/base_button";
import type {
  ApplicationCommandData,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Interaction } from "./interaction";

export interface SlashInteraction<T> {
  type: 2;
  data: ApplicationCommandData;
}

export class SlashInteraction<T> extends Interaction {
  private _options: any;

  constructor(
    interaction: any,
    private command: SlashCommand | SubcommandGroupOption | SubcommandOption
  ) {
    super(interaction);
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
      this.id,
      this.token,
      { type: 4, data: response }
    );
  }

  async followupWith(
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
    await this.discordRestService.createFollowupMessage(this.token, {
      ...response,
      flags: 64,
    });
  }

  public options(): T {
    if (this._options) return this._options;
    this._options = {};
    for (const option of this.getRawOptions() ?? []) {
      if (option.type === 6) {
        const user = this.data?.resolved?.users?.[option.value as any];
        (this.options as any)[option.name] = user;
      } else {
        (this.options as any)[option.name] = option.value;
      }
    }
    return this._options;
  }

  private getRawOptions() {
    if (this.command instanceof SlashCommand) {
      return this.data?.options;
    } else if (this.command instanceof SubcommandGroupOption) {
      return this.data?.options?.[0].options;
    } else {
      return this.data?.options?.[0]?.options?.[0].options;
    }
  }
}
