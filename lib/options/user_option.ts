import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { User } from "../interfaces/user";
import { Option } from "./option";

export class UserOption<
  N extends string = string,
  R extends boolean = false
> extends Option<N, R> {
  readonly type = 6;
  readonly jsType!: User;

  constructor(name: N, description: string, required?: R) {
    super(name, description, required);
  }

  equals(option: ApplicationCommandOption): boolean {
    return (
      option.type === 3 &&
      this.description === option.description &&
      this.name === option.name &&
      this.required === option.required
    );
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
    };
  }
}

export function user<N extends string = string, R extends boolean = false>(
  name: N,
  description: string,
  options?: {
    required?: R;
  }
) {
  return new UserOption<N, R>(name, description, options?.required);
}
