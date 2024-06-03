import type { User } from "./user";

export interface Emoji {
  id: string;
  name: string;
  roles?: any[];
  user?: User;
  require_colons?: boolean;
  managed?: boolean;
  animated?: boolean;
  available?: boolean;
}
