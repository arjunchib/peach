import type { ApplicationCommandOption } from "../interfaces/application_command";

export abstract class Option<
  R extends boolean = boolean,
  A extends boolean = false
> {
  name = "_temp_name";
  abstract readonly type: number;
  abstract readonly jsType: any;

  constructor(public description: string, name?: string, public required?: R) {
    if (name) this.name = name;
  }

  abstract equals(option: ApplicationCommandOption): boolean;
  abstract toApplicationCommandOption(): ApplicationCommandOption;
}
