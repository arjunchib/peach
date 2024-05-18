import type { SlashCommand } from "../commands/slash_command";
import type { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Route } from "./route";

export class CommandRoute extends Route {}

export class CommandRouteFrom<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
> {
  options: any;

  constructor(public command: T) {}

  to<K extends new () => any>(controller: K, method: keyof InstanceType<K>) {
    return new CommandRoute(controller, method);
  }
}

export function commandRoute<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
>(...args: ConstructorParameters<typeof CommandRouteFrom<T>>) {
  return new CommandRouteFrom(...args);
}
