export interface ApplicationCommand {
  id: string;
  type?: 1 | 2 | 3;
  application_id: string;
  guild_id?: string;
  name: string;
  name_localizations?: { [locale: string]: string };
  description: string;
  description_localizations?: { [locale: string]: string };
  options?: ApplicationCommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  default_permission?: boolean;
  nsfw?: boolean;
  snowflake: string;
}

export interface ApplicationCommandOption {
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  name: string;
  name_localizations?: { [locale: string]: string };
  description: string;
  description_localizations?: { [locale: string]: string };
  required?: boolean;
  choices?: (string | number)[];
  options?: ApplicationCommandOption[];
  channel_types?: (0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13 | 14 | 15 | 16)[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete?: boolean;
}
