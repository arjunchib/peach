import { SlashCommand } from "../commands/slash_command";
import type { Interaction } from "../interactions/interaction";
import { SlashInteraction } from "../interactions/slash_interaction";
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

  matches(interaction: Interaction): boolean {
    if (interaction.type !== 2) return false;
    let parent = (this.command as any)["_parent"];
    const commandTree = [this.command];
    while (parent != null) {
      commandTree.push(parent);
      parent = parent["_parent"];
    }
    commandTree.reverse();
    let data = interaction.data;
    for (const command of commandTree) {
      if (!data || command.name !== data.name) return false;
      data = data.options?.[0];
    }
    return true;
  }

  async execute(interaction: Interaction): Promise<void> {
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
