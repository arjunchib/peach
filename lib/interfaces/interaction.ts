import type { Embed } from "./embed";
import type { Message } from "./message";
import type { User } from "./user";

export interface ApplicationCommandData {
  id: string;
  name: string;
  type: 1 | 2 | 3;
  resolved?: ApplicationCommandDataResolved;
  options?: ApplicationCommandDataOption[];
  guild_id?: string;
  target_id?: string;
}

export interface ApplicationCommandDataResolved {
  users?: Record<string, User>;
  members?: Record<string, any>;
  roles?: Record<string, any>;
  channels?: Record<string, any>;
  messages?: Record<string, any>;
  attachments?: Record<string, any>;
}

export interface ApplicationCommandDataOption {
  name: string;
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  value?: boolean | string | number;
  options?: ApplicationCommandDataOption[];
  focused?: boolean;
}

export interface MessageComponentData {
  custom_id: string;
  component_type: number;
  values?: any;
  resolved?: any;
}

export interface InteractionResponse {
  type: 1 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  data?: MessageInteractionResponseData | AutocompleteInteractionResponseData;
}

export interface MessageInteractionResponseData {
  tts?: boolean;
  content?: string;
  embeds?: Embed[];
  allowed_mentions?: any;
  flags?: number;
  components?: any[];
  attachments?: any[];
}

export interface AutocompleteInteractionResponseData {
  choices: Choice[];
}

export interface Choice<T extends string | number = string | number> {
  /** 1-100 character choice name */
  name: string;
  /** Localization dictionary for the name field. Values follow the same restrictions as name */
  name_localizations?: any;
  /** Value for the choice, up to 100 characters if string */
  value: T;
}
