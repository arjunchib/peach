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

export class CommandRoute extends Route {}

export class CommandRouteFrom<
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
    return new CommandRoute(controller, method);
  }
}

export function commandRoute<
  T extends SlashCommand,
  const S1 extends T extends SlashCommand<infer O>
    ? IsSubcommandOrGroup<O>["name"]
    : never,
  const S2 extends GroupOption<T["options"][number], S1>["name"]
>(...args: ConstructorParameters<typeof CommandRouteFrom<T, S1, S2>>) {
  return new CommandRouteFrom(...args);
}
