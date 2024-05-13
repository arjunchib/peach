import type { ApplicationCommand } from "../interfaces/application_command";
import type { Option } from "../options/option";
import { AutocompleteRoute } from "../routes/autocomplete_route";
import { Command } from "./command";

export class SlashCommand<T extends Option = Option> extends Command {
  readonly type = 1;

  constructor(name: string, description: string, public options: T[]) {
    super(name, description);
  }

  protected equals(applicationCommand: ApplicationCommand) {
    return (
      super.equals(applicationCommand) && this.optionsMatch(applicationCommand)
    );
  }

  protected toApplicationCommand(): Partial<ApplicationCommand> {
    const options = Object.values(this.options).map((option) =>
      option["toApplicationCommandOption"]()
    );
    return {
      ...super.toApplicationCommand(),
      options,
    };
  }

  private optionsMatch(applicationCommand: ApplicationCommand): boolean {
    const myOptions = Object.values(this.options).toSorted(this.sortByName);
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
  description: string,
  options: {
    options: T[];
  }
) {
  return new SlashCommand(name, description, options.options);
}
