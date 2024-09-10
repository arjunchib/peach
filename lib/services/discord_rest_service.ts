import { APP_CONFIG } from "../bootstrap";
import { HttpClient } from "../http_client";
import { inject } from "../injector";
import type { ApplicationCommand } from "../interfaces/application_command";
import type { Embed } from "../interfaces/embed";
import type { GuildMember } from "../interfaces/guild_member";
import type {
  InteractionResponse,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import type { Message } from "../interfaces/message";

interface CreateMessageOptions {
  content?: string;
  nonce?: number;
  tts?: boolean;
  embeds?: Embed[];
  allowed_mentions?: any;
  message_reference?: any;
  components?: any[];
  sticker_ids?: any[];
  files?: any[];
  attachments?: any[];
  flags?: number;
  enforce_nonce?: boolean;
  poll?: any;
}

export class DiscordRestService {
  private config = inject(APP_CONFIG);
  private http = new HttpClient("https://discord.com/api/v10");

  async getGateway(): Promise<{ url: string }> {
    const res = await fetch("https://discord.com/api/gateway");
    return (await res.json()) as { url: string };
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

  async editOriginalInteractionResponse(
    interactionToken: string,
    response: MessageInteractionResponseData
  ) {
    return await this.http.patch(
      `/webhooks/${this.config.applicationId}/${interactionToken}/messages/@original`,
      response
    );
  }

  async deleteOriginalInteractionResponse(interactionToken: string) {
    return await this.http.delete(
      `/webhooks/${this.config.applicationId}/${interactionToken}/messages/@original`
    );
  }

  async createFollowupMessage(
    interactionToken: string,
    response: MessageInteractionResponseData
  ) {
    return await this.http.post<Message>(
      `/webhooks/${this.config.applicationId}/${interactionToken}`,
      response
    );
  }

  async deleteFollowupMessage(interactionToken: string, messageId: string) {
    return await this.http.delete(
      `/webhooks/${this.config.applicationId}/${interactionToken}/messages/${messageId}`
    );
  }

  async deleteMessage(channelId: string, messageId: string) {
    return await this.http.delete(
      `/channels/${channelId}/messages/${messageId}`
    );
  }

  async getGuildMember(guildId: string, userId: string) {
    return await this.http.get<GuildMember>(
      `/guilds/${guildId}/members/${userId}`
    );
  }

  async createMessage(channelId: string, messageOptions: CreateMessageOptions) {
    return await this.http.post<Message>(
      `/channel${channelId}/messages`,
      messageOptions
    );
  }

  async editMessage(
    channelId: string,
    messageId: string,
    messageOptions: Pick<
      CreateMessageOptions,
      | "content"
      | "embeds"
      | "flags"
      | "allowed_mentions"
      | "components"
      | "files"
      | "attachments"
    >
  ) {
    return await this.http.patch<Message>(
      `/channel${channelId}/messages/${messageId}`,
      messageOptions
    );
  }
}
