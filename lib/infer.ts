import type { Command } from "./commands/command";
import type { MessageCommand } from "./commands/message_command";
import type { SlashCommand } from "./commands/slash_command";
import type { UserCommand } from "./commands/user_command";
import type { AutocompleteInteraction } from "./interactions/autocomplete_interaction";
import type { MessageInteraction } from "./interactions/message_interaction";
import type { SlashInteraction } from "./interactions/slash_interaction";
import type { UserInteraction } from "./interactions/user_interaction";
import type { SubcommandGroupOption } from "./options/subcommand_group_option";
import type { SubcommandOption } from "./options/subcommand_option";
import type { InteractionOption, OptionValue } from "./options/types";

type GetSlashCommandOption<T extends SlashCommand> = T extends SlashCommand<
  infer O
>
  ? InteractionOption<O>
  : never;

export type $slash<
  T extends Command | SubcommandGroupOption | SubcommandOption
> = T extends SlashCommand
  ? SlashInteraction<GetSlashCommandOption<T>>
  : T extends UserCommand
  ? UserInteraction
  : T extends MessageCommand
  ? MessageInteraction
  : T extends SubcommandGroupOption | SubcommandOption
  ? SlashInteraction<OptionValue<T>>
  : never;

export type $autocomplete<
  T extends SlashCommand | SubcommandGroupOption | SubcommandOption
> = T extends SlashCommand
  ? AutocompleteInteraction<GetSlashCommandOption<T>>
  : T extends SubcommandGroupOption | SubcommandOption
  ? AutocompleteInteraction<OptionValue<T>>
  : never;

export type $focus<T> = AutocompleteInteraction<any, T>;
