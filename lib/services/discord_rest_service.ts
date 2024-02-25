import { APP_CONFIG } from "../bootstrap";
import { HttpClient } from "../http_client";
import { inject } from "../injector";
import type { ApplicationCommand } from "../interfaces/application_command";
import type { InteractionResponse } from "../interfaces/interaction";

export class DiscordRestService {
  private config = inject(APP_CONFIG);
  private http = new HttpClient("https://discord.com/api/v10");

  async getGateway(): Promise<{ url: string }> {
    const res = await fetch("https://discord.com/api/gateway");
    return await res.json();
  }

  async getGlobalApplicationCommands(): Promise<ApplicationCommand[]> {
    return await this.http.get(
      `/applications/${this.config.applicationId}/commands`
    );
  }

  async getGuildApplicationCommands(
    guildId: string
  ): Promise<ApplicationCommand[]> {
    return await this.http.get(
      `/applications/${this.config.applicationId}/guilds/${guildId}/commands`
    );
  }

  async bulkOverwriteGlobalApplicationCommands(
    commands: Partial<ApplicationCommand>[]
  ) {
    return await this.http.put(
      `/applications/${this.config.applicationId}/commands`,
      commands
    );
  }

  async bulkOverwriteGuildApplicationCommands(
    guildId: string,
    commands: Partial<ApplicationCommand>[]
  ) {
    return await this.http.put(
      `/applications/${this.config.applicationId}/guilds/${guildId}/commands`,
      commands
    );
  }

  async createInteractionResponse(
    interactionId: string,
    interactionToken: string,
    response: InteractionResponse
  ) {
    return await this.http.post(
      `/interactions/${interactionId}/${interactionToken}/callback`,
      response
    );
  }
}
