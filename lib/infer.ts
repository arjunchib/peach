import type { Command } from "./commands/command";
import type { MessageCommand } from "./commands/message_command";
import type { SlashCommand } from "./commands/slash_command";
import type { UserCommand } from "./commands/user_command";
import type { AutocompleteInteraction } from "./interactions/autocomplete_interaction";
import type { MessageInteraction } from "./interactions/message_interaction";
import type { SlashInteraction } from "./interactions/slash_interaction";
import type { UserInteraction } from "./interactions/user_interaction";

export type $slash<T extends Command> = T extends SlashCommand
  ? SlashInteraction<T>
  : T extends UserCommand
  ? UserInteraction
  : T extends MessageCommand
  ? MessageInteraction
  : never;

export type $autocomplete<T extends SlashCommand> = AutocompleteInteraction<T>;
