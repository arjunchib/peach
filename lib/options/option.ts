import type { ApplicationCommandOption } from "../interfaces/application_command";

export abstract class Option<T extends boolean = boolean> {
  name = "_temp_name";
  abstract readonly type: 3;
  abstract readonly jsType: string | number | boolean;

  constructor(public description: string, name?: string, public required?: T) {
    if (name) this.name = name;
  }

  abstract equals(option: ApplicationCommandOption): boolean;
  abstract toApplicationCommandOption(): ApplicationCommandOption;
}
