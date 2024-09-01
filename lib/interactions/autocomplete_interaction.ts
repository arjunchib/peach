import { SlashCommand } from "../commands/slash_command";
import type { ApplicationCommandData, Choice } from "../interfaces/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Interaction } from "./interaction";

export interface AutocompleteInteraction<T, F = any> {
  type: 4;
  data: ApplicationCommandData;
}

export class AutocompleteInteraction<T, F = any> extends Interaction {
  _options: any;
  _focused: any;

  constructor(
    interaction: any,
    private command: SlashCommand | SubcommandGroupOption | SubcommandOption
  ) {
    super(interaction);
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
      this.id,
      this.token,
      { type: 8, data: { choices: myChoices } }
    );
  }

  options(): T {
    if (this._options) return this._options;
    this.setOptions();
    return this._options;
  }

  focus(): F {
    if (this._focused) return this._focused;
    this.setOptions();
    return this._focused;
  }

  private setOptions() {
    this._options = {};
    for (const option of this.getRawOptions() ?? []) {
      (this._options as any)[option.name] = option.value;
      if (option.focused) this._focused = option.value as any;
    }
  }

  private getRawOptions() {
    if (this.command instanceof SlashCommand) {
      return this.data?.options;
    } else if (this.command instanceof SubcommandGroupOption) {
      return this.data?.options?.[0].options;
    } else {
      const firstLevel = this.data?.options?.[0];
      return firstLevel?.type === 1
        ? firstLevel.options
        : firstLevel?.options?.[0].options;
    }
  }
}
