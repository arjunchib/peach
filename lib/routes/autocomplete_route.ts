import { SlashCommand } from "../commands/slash_command";
import { AutocompleteInteraction } from "../interactions/autocomplete_interaction";
import type { Interaction } from "../interactions/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Route } from "./route";

export class AutocompleteRoute extends Route {
  private parentCommand: SlashCommand;

  constructor(
    controller: any,
    method: string | number | symbol,
    private command: SlashCommand | SubcommandGroupOption | SubcommandOption,
    private focus: string[]
  ) {
    super(controller, method);
    this.parentCommand = this.getParentCommand(this.command);
  }

  matches(interaction: Interaction): boolean {
    if (interaction.type !== 4) return false;
    if (interaction.data?.name !== this.parentCommand.name) return false;
    const rawOptions = this.getRawOptions(interaction);
    if (this.focus.length > 0) {
      if (!rawOptions) return false;
      if (rawOptions.name !== this.command.name) return false;
      if (!rawOptions.options) return false;
      return rawOptions.options.some(
        (opt) => opt.focused && this.focus.includes(opt.name)
      );
    } else {
      if (!rawOptions) return true;
      if (rawOptions.name !== this.command.name) return false;
    }
    return true;
  }

  async execute(interaction: Interaction): Promise<void> {
    const itn = new AutocompleteInteraction(interaction, this.command);
    await this.forwardToController(itn);
  }

  private getParentCommand(
    command: SlashCommand | SubcommandGroupOption | SubcommandOption
  ): SlashCommand {
    if (command instanceof SlashCommand) {
      return command;
    } else if (command instanceof SubcommandGroupOption) {
      return command["_parent"];
    } else {
      return this.getParentCommand(command["_parent"]);
    }
  }

  private getRawOptions(interaction: Interaction) {
    if (this.command instanceof SlashCommand) {
      return interaction.data;
    } else if (this.command instanceof SubcommandGroupOption) {
      return interaction.data?.options?.[0];
    } else {
      return interaction.data?.options?.[0]?.options?.[0];
    }
  }
}

export class AutocompleteRouteFrom<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
> {
  private _focus: string[] = [];

  constructor(public command: T) {}

  to<K extends new () => any>(controller: K, method: keyof InstanceType<K>) {
    return new AutocompleteRoute(controller, method, this.command, this._focus);
  }

  focus<
    const K extends T extends
      | SlashCommand<infer O>
      | SubcommandOption<any, any, infer O>
      ? O["name"]
      : never
  >(...options: K[]) {
    this._focus = options;
    return this;
  }
}

export function autocompleteRoute<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
>(...args: ConstructorParameters<typeof AutocompleteRouteFrom<T>>) {
  return new AutocompleteRouteFrom(...args);
}
