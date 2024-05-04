import type { SlashCommand } from "../commands/slash_command";
import type { Choice, DiscordInteraction } from "../interfaces/interaction";
import type { Option } from "../options/option";
import { Interaction } from "./interaction";

type AutocompleteOption<T extends Option> = {
  value?: T["jsType"];
  focused: boolean;
};

type RequiredType<T extends Record<string, Option>> = {
  [P in keyof T as T[P] extends Option<true, true>
    ? P
    : never]: AutocompleteOption<T[P]>;
};

type OptionalType<T extends Record<string, Option>> = {
  [P in keyof T as T[P] extends Option<false, true>
    ? P
    : never]?: AutocompleteOption<T[P]>;
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
