import { Command } from "./command";

export class MessageCommand extends Command {
  readonly type = 3;
}

export function messageCommand(value: { name?: string; description: string }) {
  return new MessageCommand(value.description, value.name);
}
