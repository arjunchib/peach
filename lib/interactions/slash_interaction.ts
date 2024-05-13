import type { SlashCommand } from "../commands/slash_command";
import type { JsType } from "../helpers";
import type {
  DiscordInteraction,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import type { Option } from "../options/option";
import { Interaction } from "./interaction";

type RequiredOptions<T extends Option[]> = {
  [P in T[number] as P extends Option<any, true, any, any>
    ? P["name"]
    : never]: JsType<P>;
};

type OptionalOptions<T extends Option[]> = {
  [P in T[number] as P extends Option<any, false, any, any>
    ? P["name"]
    : never]?: JsType<P>;
};

// type myOption = StringOption<false, false>;

// type IsRequired<T> = [T] extends [Option<true, true>] ? true : false;

// type test = IsRequired<myOption>;

export class SlashInteraction<T extends SlashCommand> extends Interaction {
  options: RequiredOptions<T["options"]> & OptionalOptions<T["options"]> =
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
