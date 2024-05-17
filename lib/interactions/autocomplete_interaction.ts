import type { SlashCommand } from "../commands/slash_command";
import type { JsType } from "../helpers";
import type { Choice, DiscordInteraction } from "../interfaces/interaction";
import type { Option } from "../options/option";
import type { AutocompleteOption } from "../options/types";
import { Interaction } from "./interaction";

export class AutocompleteInteraction<
  T extends SlashCommand
> extends Interaction {
  options: AutocompleteOption<T extends SlashCommand<infer K> ? K : never> =
    {} as any; // set below

  constructor(raw: DiscordInteraction) {
    super(raw);
    this.setOptions();
  }

  async respondWith(choices: Choice[]) {
    await this.discordRestService.createInteractionResponse(
      this.raw.id,
      this.raw.token,
      { type: 8, data: { choices } }
    );
  }

  private setOptions() {
    if (this.raw.data?.options) {
      for (const option of this.raw.data.options) {
        (this.options as any)[option.name] = {
          value: option.value,
          focused: option.focused,
        };
      }
    }
  }
}
