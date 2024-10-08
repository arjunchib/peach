import type { SlashCommand } from "../commands/slash_command";
import type { ExpandRecursively } from "../helpers";
import type { ApplicationCommandOption } from "../interfaces/application_command";
import { Option } from "./option";
import { SubcommandOption } from "./subcommand_option";
import type { InteractionOption, OptionValue } from "./types";

export class SubcommandGroupOption<
  const N extends string = string,
  const V extends any = any,
  const O extends SubcommandOption = SubcommandOption
> extends Option<N, V, false, false> {
  readonly type = 2;
  private _options: O[] = [];
  private _parent!: SlashCommand;

  constructor(name: N, description: string) {
    super(name, description);
  }

  options<K extends SubcommandOption>(options: K[]) {
    this._options = options as any;
    this._options.forEach((opt) => {
      if (opt instanceof SubcommandOption) {
        (opt as any)["_parent"] = this;
      }
    });
    return this as unknown as SubcommandGroupOption<N, InteractionOption<K>, K>;
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      options: this._options?.map((opt) => opt["toApplicationCommandOption"]()),
    };
  }
}

export function subcommandGroup<const N extends string = string>(
  name: N,
  description: string
) {
  return new SubcommandGroupOption(name, description);
}
