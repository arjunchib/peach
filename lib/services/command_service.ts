import { APP_CONFIG } from "../bootstrap";
import type { MessageCommand } from "../commands/message_command";
import type { SlashCommand } from "../commands/slash_command";
import type { UserCommand } from "../commands/user_command";
import { inject } from "../injector";
import type { ApplicationCommand } from "../interfaces/application_command";
import { DiscordRestService } from "./discord_rest_service";

export class CommandService {
  private config = inject(APP_CONFIG);
  private discordRestService = inject(DiscordRestService);

  async sync() {
    if (this.config.syncCommands?.global) {
      await this.syncGlobal();
    }
    if (this.config.syncCommands?.guildId) {
      await this.syncGuild(this.config.syncCommands?.guildId);
    }
  }

  private async syncGlobal() {
    const remoteCommands =
      await this.discordRestService.getGlobalApplicationCommands();
    const localCommands = [
      ...Object.values(this.config.commands.slash),
      ...Object.values(this.config.commands.user),
      ...Object.values(this.config.commands.message),
    ];
    remoteCommands.sort(this.compareCommands);
    localCommands.sort(this.compareCommands);
    if (this.commandsMatch(localCommands, remoteCommands)) {
      const commands = localCommands.map((command) =>
        command.toApplicationCommand()
      );
      await this.discordRestService.bulkOverwriteGlobalApplicationCommands(
        commands
      );
    }
  }

  private async syncGuild(id: string) {
    const guildId = this.config.syncCommands?.guildId;
    if (!guildId) throw new Error("No guild id!");
    const remoteCommands =
      await this.discordRestService.getGuildApplicationCommands(guildId);
    const localCommands = [
      ...Object.values(this.config.commands.slash),
      ...Object.values(this.config.commands.user),
      ...Object.values(this.config.commands.message),
    ];
    remoteCommands.sort(this.compareCommands);
    localCommands.sort(this.compareCommands);
    if (!this.commandsMatch(localCommands, remoteCommands)) {
      const commands = localCommands.map((command) =>
        command.toApplicationCommand()
      );
      await this.discordRestService.bulkOverwriteGuildApplicationCommands(
        guildId,
        commands
      );
    }
  }

  private compareCommands(
    a: ApplicationCommand | SlashCommand | UserCommand | MessageCommand,
    b: ApplicationCommand | SlashCommand | UserCommand | MessageCommand
  ) {
    const nameComparison = a.name!.localeCompare(b.name!);
    if (nameComparison === 0) {
      return (a.type ?? 1) - (b.type ?? 1);
    }
    return nameComparison;
  }

  private commandsMatch(
    a: (SlashCommand | UserCommand | MessageCommand)[],
    b: ApplicationCommand[]
  ): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!a[i].equals(b[i])) return false;
    }
    return true;
  }
}
