import type { SlashCommand } from "../commands/slash_command";
import type { JsType } from "../helpers";
import type { Choice, DiscordInteraction } from "../interfaces/interaction";
import type { Option } from "../options/option";
import { Interaction } from "./interaction";

type RequiredAutocompleteOption<T extends Option> = {
  value: JsType<T>;
  focused: boolean;
};

type OptionalAutocompleteOption<T extends Option> = {
  value?: JsType<T>;
  focused: boolean;
};

type RequiredType<T extends Option[]> = {
  [P in T[number] as P extends Option<any, true, true>
    ? P["name"]
    : never]: RequiredAutocompleteOption<P>;
};

type OptionalType<T extends Option[]> = {
  [P in T[number] as P extends Option<any, false, true>
    ? P["name"]
    : never]: OptionalAutocompleteOption<P>;
};

export class AutocompleteInteraction<
  T extends SlashCommand
> extends Interaction {
  options: RequiredType<T["options"]> & OptionalType<T["options"]> = {} as any; // set below

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
