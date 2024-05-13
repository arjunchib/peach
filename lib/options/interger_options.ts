import type { Choice } from "../interfaces/interaction";
import { NumberOption } from "./number_option";

export class IntegerOption<
  N extends string = string,
  R extends boolean = false,
  A extends boolean = false
> extends NumberOption<N, R, A> {
  type = 4 as const;
}

export function integer<
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
  return new IntegerOption<N, R, A>(
    name,
    description,
    options?.required,
    options?.autocomplete,
    options?.choices,
    options?.minValue,
    options?.maxValue
  );
}
