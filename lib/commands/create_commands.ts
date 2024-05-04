import type { AutocompleteInteraction } from "../interactions/autocomplete_interaction";
import type { SlashInteraction } from "../interactions/slash_interaction";
import type { MessageCommand } from "./message_command";
import type { SlashCommand } from "./slash_command";
import type { UserCommand } from "./user_command";

export interface Commands {
  slash: Record<string, SlashCommand<any>>;
  user: Record<string, UserCommand>;
  message: Record<string, MessageCommand>;
}

export type inferInteraction<T extends Commands> = {
  slash: SlashInteractionTypes<T>;
  autocomplete: AutocompleteInteractionTypes<T>;
};

type SlashInteractionTypes<T extends Commands> = {
  [P in keyof T["slash"]]: SlashInteraction<T["slash"][P]>;
};

type AutocompleteInteractionTypes<T extends Commands> = {
  [P in keyof T["slash"]]: AutocompleteInteraction<T["slash"][P]>;
};

export function createCommands<T extends Commands>(commands: T): T {
  Object.entries(commands.slash).forEach(([name, command]) => {
    command.name = name;
  });
  Object.entries(commands.user).forEach(([name, command]) => {
    command.name = name;
  });
  Object.entries(commands.message).forEach(([name, command]) => {
    command.name = name;
  });
  return commands;
}
