import { SlashCommand } from "../commands/slash_command";
import { SlashInteraction } from "../interactions/slash_interaction";
import type { DiscordInteraction } from "../interfaces/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { Route } from "./route";

export class CommandRoute extends Route {
  private parentCommand: SlashCommand;

  constructor(
    public command: SlashCommand | SubcommandGroupOption | SubcommandOption,
    controller: any,
    method: string | number | symbol
  ) {
    super(controller, method);
    this.parentCommand = this.getParentCommand(this.command);
  }

  matches(interaction: DiscordInteraction): boolean {
    if (interaction.type !== 2) return false;
    if (interaction.data?.name !== this.parentCommand.name) return false;
    if (this.command instanceof SlashCommand) {
      return true;
    } else if (this.command instanceof SubcommandGroupOption) {
      return interaction.data?.options?.[0].name === this.command.name;
    } else {
      return (
        interaction.data?.options?.[0]?.options?.[0].name === this.command.name
      );
    }
  }

  async execute(interaction: DiscordInteraction): Promise<void> {
    const itn = new SlashInteraction(interaction, this.command);
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
}

export class CommandRouteFrom<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
> {
  constructor(public command: T) {}

  to<K extends new () => any>(controller: K, method: keyof InstanceType<K>) {
    return new CommandRoute(this.command, controller, method);
  }
}

export function commandRoute<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
>(...args: ConstructorParameters<typeof CommandRouteFrom<T>>) {
  return new CommandRouteFrom(...args);
}
