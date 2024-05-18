import type { SlashCommand } from "../commands/slash_command";
import type { Option } from "../options/option";
import type { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import type { OptionOption, OptionValue } from "../options/types";
import { Route } from "./route";

export class AutocompleteRoute extends Route {}

export class AutocompleteRouteFrom<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
> {
  options: any;

  constructor(public command: T) {}

  to<K extends new () => any>(controller: K, method: keyof InstanceType<K>) {
    return new AutocompleteRoute(controller, method);
  }

  focus<
    const K extends T extends
      | SlashCommand<infer O>
      | SubcommandOption<any, any, infer O>
      ? O["name"]
      : never
  >(...options: K[]) {
    return this;
  }
}

export function autocompleteRoute<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
>(...args: ConstructorParameters<typeof AutocompleteRouteFrom<T>>) {
  return new AutocompleteRouteFrom(...args);
}
