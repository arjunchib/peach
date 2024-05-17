import type { SlashCommand } from "../commands/slash_command";
import type { Option } from "../options/option";
import type { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import type { OptionOption, OptionValue } from "../options/types";
import { Route } from "./route";

type GetOption<T extends SlashCommand> = T extends SlashCommand<infer O>
  ? O
  : never;

type GetS1<T extends Option, S1 extends string> = T extends Option<S1>
  ? T
  : never;

export class AutocompleteRoute extends Route {}

export class AutocompleteRouteFrom<
  T extends SlashCommand,
  const S1 extends T extends SlashCommand<infer O>
    ? O extends SubcommandGroupOption | SubcommandOption
      ? O["name"]
      : never
    : never,
  const S2 extends T extends SlashCommand<infer O1>
    ? O1 extends SubcommandGroupOption<S1, any, infer O2>
      ? O2["name"]
      : never
    : never
> {
  options: any;

  constructor(
    public command: T,
    public subcommand1?: S1,
    public subcommand2?: S2
  ) {}

  to<K extends new () => any>(controller: K, method: keyof InstanceType<K>) {
    return new AutocompleteRoute(controller, method);
  }

  focus<
    const K extends [S1] extends [never]
      ? GetOption<T>["name"]
      : [S2] extends [never]
      ? keyof OptionValue<GetS1<GetOption<T>, S1>>
      : keyof OptionValue<GetS1<OptionOption<GetS1<GetOption<T>, S1>>, S2>>
  >(...options: K[]) {
    return this;
  }
}

export function autocompleteRoute<
  T extends SlashCommand,
  const S1 extends T extends SlashCommand<infer O>
    ? O extends SubcommandGroupOption | SubcommandOption
      ? O["name"]
      : never
    : never,
  const S2 extends T extends SlashCommand<infer O1>
    ? O1 extends SubcommandGroupOption<S1, any, infer O2>
      ? O2["name"]
      : never
    : never
>(...args: ConstructorParameters<typeof AutocompleteRouteFrom<T, S1, S2>>) {
  return new AutocompleteRouteFrom(...args);
}
