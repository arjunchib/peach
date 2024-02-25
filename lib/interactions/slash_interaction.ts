import type { SlashCommand } from "../commands/slash_command";
import type { DiscordInteraction } from "../interfaces/interaction";
import type { Option } from "../options/option";
import { Interaction } from "./interaction";

type JsType<T extends Record<string, Option>> = {
  [P in keyof T]: T[P]["jsType"];
};

type RequiredType<T extends Record<string, Option>> = {
  [P in keyof T as T[P] extends Option<true> ? P : never]: T[P]["jsType"];
};

type OptionalType<T extends Record<string, Option>> = {
  [P in keyof T as T[P] extends Option<false> ? P : never]?: T[P]["jsType"];
};

export class SlashInteraction<T extends SlashCommand> extends Interaction {
  options: RequiredType<T["options"]> & OptionalType<T["options"]> = {} as any; // set below

  constructor(raw: DiscordInteraction) {
    super(raw);
    this.setOptions();
  }

  private setOptions() {
    for (const option of this.raw.data?.options ?? []) {
      (this.options as any)[option.name] = option.value;
    }
  }
}
