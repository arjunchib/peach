import { inject } from "../injector";
import { DiscordRestService } from "../services/discord_rest_service";

export interface Interaction {
  id: string;
  application_id: string;
  type: 1 | 2 | 3 | 4 | 5;
  data?: any;
  guild?: any;
  guild_id?: string;
  channel?: any;
  channel_id?: string;
  member?: any;
  user?: any;
  token: string;
  version: number;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
  entitlements: any[];
  authorizing_integration_owners: any;
  context?: any;
}

export abstract class Interaction {
  protected discordRestService = inject(DiscordRestService);

  constructor(interaction: any) {
    Object.assign(this, interaction);
  }

  // async respondWith(response: string) {
  //   await this.discordRestService.createInteractionResponse(
  //     this.raw.id,
  //     this.raw.token,
  //     { type: 4, data: { content: response } }
  //   );
  // }
}
