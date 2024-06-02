import { APP_CONFIG } from "../bootstrap";
import type { Command } from "../commands/command";
import { inject } from "../injector";
import type { ApplicationCommand } from "../interfaces/application_command";
import { DiscordRestService } from "./discord_rest_service";
import { StoreService } from "./store_service";

export class CommandService {
  private config = inject(APP_CONFIG);
  private discordRestService = inject(DiscordRestService);
  private storeService = inject(StoreService);

  async sync() {
    if (this.config.syncCommands?.global) {
      await this.syncGlobal();
    }
    if (this.config.syncCommands?.guildId) {
      await this.syncGuild(this.config.syncCommands?.guildId);
    }
  }

  private async syncGlobal() {
    const localCommands = Object.values(this.config.commands);
    localCommands.sort(this.compareCommands);
    const hash = Bun.hash.cityHash32(JSON.stringify(localCommands));
    if (this.storeService.store.globalCommandsHash === hash) {
      return;
    } else {
      this.storeService.store.globalCommandsHash = hash;
      await this.storeService.save();
    }
    const remoteCommands =
      await this.discordRestService.getGlobalApplicationCommands();
    remoteCommands.sort(this.compareCommands);
    if (this.commandsMatch(localCommands, remoteCommands)) {
      const commands = localCommands.map((command) =>
        command["toApplicationCommand"]()
      );
      await this.discordRestService.bulkOverwriteGlobalApplicationCommands(
        commands
      );
    }
  }

  private async syncGuild(id: string) {
    const guildId = this.config.syncCommands?.guildId;
    if (!guildId) throw new Error("No guild id!");
    const localCommands = Object.values(this.config.commands);
    localCommands.sort(this.compareCommands);
    const hash = Bun.hash.cityHash32(
      JSON.stringify(localCommands.map((cmd) => cmd["toApplicationCommand"]()))
    );
    if (this.storeService.store.guildCommandsHash === hash) {
      return;
    } else {
      this.storeService.store.guildCommandsHash = hash;
      await this.storeService.save();
    }
    const remoteCommands =
      await this.discordRestService.getGuildApplicationCommands(guildId);
    remoteCommands.sort(this.compareCommands);
    if (!this.commandsMatch(localCommands, remoteCommands)) {
      const commands = localCommands.map((command) =>
        command["toApplicationCommand"]()
      );
      await this.discordRestService.bulkOverwriteGuildApplicationCommands(
        guildId,
        commands
      );
    }
  }

  private compareCommands(
    a: Command | ApplicationCommand,
    b: Command | ApplicationCommand
  ) {
    const nameComparison = a.name!.localeCompare(b.name!);
    if (nameComparison === 0) {
      return (a.type ?? 1) - (b.type ?? 1);
    }
    return nameComparison;
  }

  private commandsMatch(a: Command[], b: ApplicationCommand[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!a[i]["equals"](b[i])) return false;
    }
    return true;
  }
}
