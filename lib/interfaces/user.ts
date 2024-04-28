export interface User {
  id: string;
  username: string;
  global_name?: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  flags?: number;
  public_flags?: number;
  avatar_decoration?: string;
}
