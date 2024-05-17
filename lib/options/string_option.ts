import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";
import { Option } from "./option";

export class StringOption<
  const N extends string = string,
  const V extends string = string,
  const R extends boolean = false,
  const A extends boolean = false
> extends Option<N, V, R, A> {
  readonly type = 3;

  constructor(
    name: N,
    description: string,
    public minLength?: number,
    public maxLength?: number
  ) {
    super(name, description);
  }

  autocomplete() {
    this._autocomplete = true as A;
    return this as StringOption<N, V, R, true>;
  }

  required() {
    this._required = true as R;
    return this as StringOption<N, V, true, A>;
  }

  choices<const K extends string>(choices: Choice<K>[] | K[]) {
    this._choices = choices.map((c) => {
      if (typeof c === "string") {
        return {
          name: c,
          value: c,
        };
      }
      return c;
    });
    return this as unknown as StringOption<N, K, R, A>;
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

export function string<const N extends string = string>(
  name: N,
  description: string
) {
  return new StringOption<N>(name, description);
}

const options = [
  string("test1", "descasdsad"),
  string("test2", "descasdsad").required(),
  string("test3", "descasdsad"),
];

type Options<T extends Option[]> = {
  [P in T[number] as P["name"]]: ToOption<P>;
};

type ToOption<T extends Option> = T extends Option<any, any, true, any>
  ? ToValue<T>
  : ToValue<T> | undefined;

type ToValue<T extends Option> = T extends Option<any, infer V> ? V : never;

type TestOptions = Options<typeof options>;
