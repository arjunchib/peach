import type { SlashCommand } from "../commands/slash_command";
import type {
  DiscordInteraction,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import type { Option } from "../options/option";
import type { StringOption } from "../options/string_option";
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

// type myOption = StringOption<false, false>;

// type IsRequired<T> = [T] extends [Option<true, true>] ? true : false;

// type test = IsRequired<myOption>;

export class SlashInteraction<T extends SlashCommand> extends Interaction {
  options: RequiredType<T["options"]> & OptionalType<T["options"]> = {} as any; // set below

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
