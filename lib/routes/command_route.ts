import type { SlashCommand } from "../commands/slash_command";
import type { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Route } from "./route";

export class CommandRoute extends Route {}

export class CommandRouteFrom<
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
    return new CommandRoute(controller, method);
  }
}

export function commandRoute<
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
>(...args: ConstructorParameters<typeof CommandRouteFrom<T, S1, S2>>) {
  return new CommandRouteFrom(...args);
}
