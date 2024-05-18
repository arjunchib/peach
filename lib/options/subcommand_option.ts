import type { ExpandRecursively, JsType } from "../helpers";
import type { ApplicationCommandOption } from "../interfaces/application_command";
import { Option } from "./option";
import type { SubcommandGroupOption } from "./subcommand_group_option";
import type { InteractionOption } from "./types";

export class SubcommandOption<
  const N extends string = string,
  const V extends any = any,
  const O extends Option = Option
> extends Option<N, V, false, false> {
  readonly type = 1;
  private _options: O[] = [];

  constructor(name: N, description: string) {
    super(name, description);
  }

  options<K extends Exclude<Option, SubcommandOption | SubcommandGroupOption>>(
    options: K[]
  ) {
    this._options = options as any;
    return this as unknown as SubcommandOption<N, InteractionOption<K>, K>;
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      options: this._options?.map((opt) => opt["toApplicationCommandOption"]()),
    };
  }
}

export function subcommand<const N extends string = string>(
  name: N,
  description: string
) {
  return new SubcommandOption(name, description);
}
