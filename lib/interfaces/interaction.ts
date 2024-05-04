export interface DiscordInteraction {
  id: string;
  application_id: string;
  type: 1 | 2 | 3 | 4 | 5;
  data?: ApplicationCommandData;
  guild_id?: string;
  channel?: any;
  channel_id?: string;
  member?: any;
  user?: any;
  token: string;
  version: number;
  message?: any;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
  entitlements: any[];
}

export interface ApplicationCommandData {
  id: string;
  name: string;
  type: 1 | 2 | 3;
  resolved?: any;
  options?: ApplicationCommandDataOption[];
  guild_id?: string;
  target_id?: string;
}

export interface ApplicationCommandDataOption {
  name: string;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  value?: boolean | string | number;
  options?: ApplicationCommandDataOption[];
  focused?: boolean;
}

export interface InteractionResponse {
  type: 1 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  data?: MessageInteractionResponseData | AutocompleteInteractionResponseData;
}

export interface MessageInteractionResponseData {
  tts?: boolean;
  content?: string;
  embeds?: any[];
  allowed_mentions?: any;
  flags?: number;
  components?: any[];
  attachments?: any[];
}

export interface AutocompleteInteractionResponseData {
  choices: Choice[];
}

export interface Choice {
  /** 1-100 character choice name */
  name: string;
  /** Localization dictionary for the name field. Values follow the same restrictions as name */
  name_localizations?: any;
  /** Value for the choice, up to 100 characters if string */
  value: string | number;
}
