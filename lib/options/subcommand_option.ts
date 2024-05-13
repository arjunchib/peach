import type { JsType } from "../helpers";
import type { ApplicationCommandOption } from "../interfaces/application_command";
import { Option } from "./option";

type OptionRecord<T extends Option> = {
  [P in T as P["name"]]: JsType<P>;
};

export class SubcommandOption<
  N extends string = string,
  R extends boolean = false,
  O extends Option = Option
> extends Option<N, R> {
  readonly type = 1;
  readonly jsType!: OptionRecord<O>;

  constructor(
    name: N,
    description: string,
    required?: R,
    public options?: O[]
  ) {
    super(name, description, required);
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      options: this.options?.map((opt) => opt["toApplicationCommandOption"]()),
    };
  }
}

export function subcommand<
  N extends string = string,
  R extends boolean = false,
  O extends Option = Option
>(
  name: N,
  description: string,
  options?: {
    required?: R;
    options?: O[];
  }
) {
  return new SubcommandOption<N, R, O>(
    name,
    description,
    options?.required,
    options?.options
  );
}
