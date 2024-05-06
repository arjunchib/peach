import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { User } from "../interfaces/user";
import { Option } from "./option";

export class UserOption<R extends boolean = false> extends Option<R> {
  readonly type = 6;
  readonly jsType!: User;

  constructor(description: string, name?: string, required?: R) {
    super(description, name, required);
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

export function user<R extends boolean = false>(
  description: string,
  options?: {
    name?: string;
    required?: R;
  }
) {
  return new UserOption<R>(description, options?.name, options?.required);
}
