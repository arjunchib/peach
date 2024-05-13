import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";
import { Option } from "./option";

export class StringOption<
  N extends string = string,
  R extends boolean = boolean,
  A extends boolean = boolean,
  const C extends string = string
> extends Option<N, R, A, C> {
  readonly type = 3;
  readonly jsType!: C;

  constructor(
    name: N,
    description: string,
    required?: R,
    autocomplete?: A,
    choices?: Choice<C>[],
    public minLength?: number,
    public maxLength?: number
  ) {
    super(name, description, required, autocomplete, choices);
  }

  equals(option: ApplicationCommandOption): boolean {
    return (
      super.equals(option) &&
      this.minLength === option.min_length &&
      this.maxLength === option.max_length
    );
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      min_length: this.minLength,
      max_length: this.maxLength,
    };
  }
}

export function string<
  const N extends string = string,
  const R extends boolean = false,
  const A extends boolean = false,
  const C extends string = string
>(
  name: N,
  description: string,
  options?: {
    required?: R;
    autocomplete?: A;
    choices?: Choice<C>[];
    minLength?: number;
    maxLength?: number;
  }
) {
  return new StringOption<N, R, A, C>(
    name,
    description,
    options?.required,
    options?.autocomplete,
    options?.choices,
    options?.minLength,
    options?.maxLength
  );
}
