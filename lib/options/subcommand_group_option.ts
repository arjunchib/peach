import type { ApplicationCommandOption } from "../interfaces/application_command";
import { Option } from "./option";
import type { SubcommandOption } from "./subcommand_option";
import type { InteractionOption, OptionValue } from "./types";

export class SubcommandGroupOption<
  const N extends string = string,
  const V extends any = any,
  const O extends SubcommandOption = SubcommandOption
> extends Option<N, V> {
  readonly type = 2;
  private _options: O[] = [];

  constructor(name: N, description: string) {
    super(name, description);
  }

  options<K extends SubcommandOption>(options: K[]) {
    this._options = options as any;
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
