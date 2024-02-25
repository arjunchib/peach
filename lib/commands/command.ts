import type { ApplicationCommand } from "../interfaces/application_command";
import { CommandRoute } from "../routes/command_route";

export abstract class Command {
  name = "_temp_name"; // we will override this after creating
  abstract readonly type: 1 | 2 | 3;

  constructor(public description: string, name?: string) {
    if (name) this.name = name;
  }

  routeTo<K extends new () => any>(
    controller: K,
    method: keyof InstanceType<K>
  ) {
    return new CommandRoute(this.type, this.name, controller, method);
  }

  equals(applicationCommand: ApplicationCommand) {
    return (
      applicationCommand.type === this.type &&
      applicationCommand.name === this.name &&
      applicationCommand.description === this.description
    );
  }

  toApplicationCommand(): Partial<ApplicationCommand> {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
    };
  }
}
