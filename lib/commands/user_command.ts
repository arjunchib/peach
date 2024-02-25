import type { ApplicationCommand } from "../interfaces/application_command";
import { Command } from "./command";

export class UserCommand extends Command {
  readonly type = 2;
}

export function userCommand(value: { name?: string; description: string }) {
  return new UserCommand(value.description, value.name);
}
