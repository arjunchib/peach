import type { ApplicationCommand } from "../interfaces/application_command";

export abstract class Command {
  abstract readonly type: 1 | 2 | 3;

  constructor(public name: string, public description: string) {}

  protected equals(applicationCommand: ApplicationCommand) {
    return (
      applicationCommand.type === this.type &&
      applicationCommand.name === this.name &&
      applicationCommand.description === this.description
    );
  }

  protected toApplicationCommand(): Partial<ApplicationCommand> {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
    };
  }
}
