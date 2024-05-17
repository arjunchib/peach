import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { User } from "../interfaces/user";
import { Option } from "./option";

export class UserOption<
  const N extends string = string,
  const V extends User = User,
  const R extends boolean = false,
  const A extends boolean = false
> extends Option<N, V, R, A> {
  readonly type = 6;

  constructor(name: N, description: string) {
    super(name, description);
  }

  autocomplete() {
    this._autocomplete = true as A;
    return this as UserOption<N, V, R, true>;
  }

  required() {
    this._required = true as R;
    return this as UserOption<N, V, true, A>;
  }

  equals(option: ApplicationCommandOption): boolean {
    return (
      super.equals(option) &&
      option.type === 3 &&
      this.description === option.description &&
      this.name === option.name
    );
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      type: this.type,
      name: this.name,
      description: this.description,
    };
  }
}

export function user<const N extends string = string>(
  name: N,
  description: string
) {
  return new UserOption<N>(name, description);
}
