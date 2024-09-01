import { APP_CONFIG } from "../bootstrap";
import { inject } from "../injector";
import type { ApplicationCommand } from "../interfaces/application_command";
import { DiscordRestService } from "./discord_rest_service";
import { StoreService } from "./store_service";
import { expect } from "bun:test";

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
    const localCommands = Object.values(this.config.commands).map((cmd) =>
      cmd["toApplicationCommand"]()
    );
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
      await this.discordRestService.bulkOverwriteGlobalApplicationCommands(
        localCommands
      );
    }
  }

  private async syncGuild(guildId: string) {
    const localCommands = Object.values(this.config.commands).map((cmd) =>
      cmd["toApplicationCommand"]()
    );
    localCommands.sort(this.compareCommands);
    const hash = Bun.hash.cityHash32(JSON.stringify(localCommands));
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
      await this.discordRestService.bulkOverwriteGuildApplicationCommands(
        guildId,
        localCommands
      );
    }
  }

  private compareCommands(
    a: Partial<ApplicationCommand>,
    b: Partial<ApplicationCommand>
  ) {
    const nameComparison = a.name!.localeCompare(b.name!);
    if (nameComparison === 0) {
      return (a.type ?? 1) - (b.type ?? 1);
    }
    return nameComparison;
  }

  private commandsMatch(
    local: Partial<ApplicationCommand>[],
    remote: Partial<ApplicationCommand>[]
  ): boolean {
    const strippedLocal = JSON.parse(JSON.stringify(local, removeDefaults));
    try {
      expect(remote).toMatchObject(strippedLocal);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

function removeDefaults(key: string, value: any) {
  const isEmptyArray = Array.isArray(value) && value.length === 0;
  if (value === undefined || value === false || isEmptyArray) {
    return undefined;
  }
  return value;
}
