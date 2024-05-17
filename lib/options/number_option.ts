import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";
import { Option } from "./option";

export class NumberOption<
  const N extends string = string,
  const V extends number = number,
  const R extends boolean = false,
  const A extends boolean = false
> extends Option<N, V, R, A> {
  readonly type: 4 | 10 = 10;
  private _minValue?: number;
  private _maxValue?: number;

  constructor(name: N, description: string) {
    super(name, description);
  }

  autocomplete() {
    this._autocomplete = true as A;
    return this as NumberOption<N, V, R, true>;
  }

  required() {
    this._required = true as R;
    return this as NumberOption<N, V, true, A>;
  }

  choices<const K extends number>(choices: Choice<K>[] | K[]) {
    this._choices = choices.map((c) => {
      if (typeof c === "number") {
        return {
          name: c.toString(),
          value: c,
        };
      }
      return c;
    });
    return this as unknown as NumberOption<N, K, R, A>;
  }

  minValue(value: number) {
    this._minValue = value;
    return this;
  }

  maxValue(value: number) {
    this._maxValue = value;
    return this;
  }

  equals(option: ApplicationCommandOption): boolean {
    return (
      super.equals(option) &&
      this._minValue === option.min_value &&
      this._minValue === option.max_value
    );
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      min_value: this._minValue,
      max_value: this._maxValue,
    };
  }
}

export function number<const N extends string = string>(
  name: N,
  description: string
) {
  return new NumberOption<N>(name, description);
}
