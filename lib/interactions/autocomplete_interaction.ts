import { SlashCommand } from "../commands/slash_command";
import type { Choice, DiscordInteraction } from "../interfaces/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Interaction } from "./interaction";

export class AutocompleteInteraction<T, F = any> extends Interaction {
  options: T = {} as T;
  focused!: F;

  constructor(
    raw: DiscordInteraction,
    private command: SlashCommand | SubcommandGroupOption | SubcommandOption
  ) {
    super(raw);
    this.setOptions();
  }

  async respondWith(choices: Choice[] | string[] | number[]) {
    const myChoices = choices.map((c) => {
      if (typeof c === "object") {
        return c;
      }
      return {
        name: c.toString(),
        value: c,
      } satisfies Choice;
    });
    await this.discordRestService.createInteractionResponse(
      this.raw.id,
      this.raw.token,
      { type: 8, data: { choices: myChoices } }
    );
  }

  private setOptions() {
    for (const option of this.getRawOptions() ?? []) {
      (this.options as any)[option.name] = option.value;
      if (option.focused) this.focused = option.value as any;
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
