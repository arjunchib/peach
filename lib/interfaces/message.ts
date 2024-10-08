import type { Embed } from "./embed";
import type { User } from "./user";

export interface Message {
  id: string;
  channel_id: string;
  author: User;
  content: string;
  timestamp: string;
  edited_timestamp: string;
  tts: boolean;
  mention_everyone: boolean;
  mentions: User[];
  mention_roles: any[];
  mention_channels?: any[];
  attachments: any[];
  embeds: Embed[];
  reactions?: any[];
  nonce?: string | number;
  pinned: boolean;
  webhook_id?: string;
  type: number;
  activity?: any;
  application?: any;
  application_id?: string;
  message_reference?: any;
  flags?: number;
  referenced_message?: any;
  interaction_metadata?: any;
  interaction?: any;
  thread?: any;
  components?: any[];
  sticker_items?: any[];
  stickers?: any[];
  position?: number;
  role_subscription_data?: any;
  resolved?: any;
  poll?: any;
  call?: any;
}
