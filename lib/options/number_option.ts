import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";
import { Option } from "./option";

export class NumberOption<
  N extends string = string,
  R extends boolean = false,
  A extends boolean = false
> extends Option<N, R, A, number> {
  readonly type: 4 | 10 = 10;
  readonly jsType!: number;

  constructor(
    name: N,
    description: string,
    required?: R,
    autocomplete?: A,
    choices?: Choice<number>[],
    public minValue?: number,
    public maxValue?: number
  ) {
    super(name, description, required, autocomplete, choices);
  }

  equals(option: ApplicationCommandOption): boolean {
    return (
      super.equals(option) &&
      this.minValue === option.min_value &&
      this.minValue === option.max_value
    );
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      min_value: this.minValue,
      max_value: this.maxValue,
    };
  }
}

export function number<
  N extends string = string,
  R extends boolean = false,
  A extends boolean = false
>(
  name: N,
  description: string,
  options?: {
    required?: R;
    choices?: Choice<number>[];
    minValue?: number;
    maxValue?: number;
    autocomplete?: A;
  }
) {
  return new NumberOption<N, R, A>(
    name,
    description,
    options?.required,
    options?.autocomplete,
    options?.choices,
    options?.minValue,
    options?.maxValue
  );
}
