import type { SlashCommand } from "../commands/slash_command";
import type { Option } from "../options/option";
import type { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Route } from "./route";

type IsSubcommandOrGroup<T extends Option> = T extends
  | SubcommandGroupOption<any, any, any>
  | SubcommandOption<any, any, any>
  ? T
  : never;

type GroupOption<
  T extends Option,
  N extends string
> = T extends SubcommandGroupOption<N, any, any>
  ? NonNullable<T["options"]>[number]
  : never;

type SubGroupOption<
  T extends Option,
  N extends string
> = T extends SubcommandOption<N, any, any>
  ? NonNullable<T["options"]>[number]
  : never;

export class AutocompleteRoute extends Route {}

export class AutocompleteRouteFrom<
  T extends SlashCommand,
  const S1 extends T extends SlashCommand<infer O>
    ? IsSubcommandOrGroup<O>["name"]
    : never,
  const S2 extends GroupOption<T["options"][number], S1>["name"]
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
      ? T["options"][number]["name"]
      : [S2] extends [never]
      ? GroupOption<T["options"][number], S1>["options"]["name"]
      : SubGroupOption<
          GroupOption<T["options"][number], S1>["options"],
          S2
        >["options"]["name"]
  >(...options: K[]) {
    return this;
  }
}

export function autocompleteRoute<
  T extends SlashCommand,
  const S1 extends T extends SlashCommand<infer O>
    ? IsSubcommandOrGroup<O>["name"]
    : never,
  const S2 extends GroupOption<T["options"][number], S1>["name"]
>(...args: ConstructorParameters<typeof AutocompleteRouteFrom<T, S1, S2>>) {
  return new AutocompleteRouteFrom(...args);
}
