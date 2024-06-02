import type { ApplicationCommand } from "../interfaces/application_command";
import type { Option } from "../options/option";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import { SubcommandOption } from "../options/subcommand_option";
import { Command } from "./command";

export class SlashCommand<const T extends Option = Option> extends Command {
  readonly type = 1;
  private _options = [] as T[];

  constructor(name: string, description: string) {
    super(name, description);
  }

  options<const K extends Option>(options: K[]) {
    this._options = options as any;
    this._options.forEach((opt) => {
      if (
        opt instanceof SubcommandGroupOption ||
        opt instanceof SubcommandOption
      ) {
        (opt as any)["_parent"] = this;
      }
    });
    return this as unknown as SlashCommand<K>;
  }

  protected equals(applicationCommand: ApplicationCommand) {
    return (
      super.equals(applicationCommand) && this.optionsMatch(applicationCommand)
    );
  }

  protected toApplicationCommand(): Partial<ApplicationCommand> {
    const options = Object.values(this._options!).map((option) =>
      option["toApplicationCommandOption"]()
    );
    return {
      ...super.toApplicationCommand(),
      options,
    };
  }

  private optionsMatch(applicationCommand: ApplicationCommand): boolean {
    const myOptions = Object.values(this._options!).toSorted(this.sortByName);
    const theirOptions = applicationCommand.options?.toSorted(this.sortByName);
    if (!theirOptions || myOptions.length !== theirOptions.length) return false;
    for (let i = 0; i < myOptions.length; i++) {
      if (!myOptions[i]["equals"](theirOptions[i])) return false;
    }
    return true;
  }

  private sortByName(a: { name?: string }, b: { name?: string }) {
    // should check if name is undefined but we expect it always will be defined
    return a.name!.localeCompare(b.name!);
  }
}

export function slashCommand<T extends Option>(
  name: string,
  description: string
) {
  return new SlashCommand(name, description);
}
