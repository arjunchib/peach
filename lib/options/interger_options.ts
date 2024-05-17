import type { Choice } from "../interfaces/interaction";
import { NumberOption } from "./number_option";

export class IntegerOption<
  N extends string = string,
  V extends number = number,
  R extends boolean = false,
  A extends boolean = false
> extends NumberOption<N, V, R, A> {
  type = 4 as const;

  autocomplete() {
    this._autocomplete = true as A;
    return this as IntegerOption<N, V, R, true>;
  }

  required() {
    this._required = true as R;
    return this as IntegerOption<N, V, true, A>;
  }

  choices<const K extends number>(choices: Choice<K>[] | K[]) {
    super.choices(choices);
    return this as unknown as IntegerOption<N, K, R, A>;
  }
}

export function integer<const N extends string = string>(
  name: N,
  description: string
) {
  return new IntegerOption<N>(name, description);
}
