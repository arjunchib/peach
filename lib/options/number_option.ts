import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";
import { Option } from "./option";

export class NumberOption<
  R extends boolean = false,
  A extends boolean = false
> extends Option<R, A> {
  readonly type = 4;
  readonly jsType!: number;

  constructor(
    description: string,
    name?: string,
    required?: R,
    public choices?: Choice<number>[],
    public minValue?: number,
    public maxValue?: number,
    public autocomplete?: A
  ) {
    super(description, name, required);
  }

  equals(option: ApplicationCommandOption): boolean {
    return (
      option.type === 3 &&
      this.description === option.description &&
      this.name === option.name &&
      this.required === option.required &&
      this.minValue === option.min_value &&
      this.minValue === option.max_value &&
      this.autocomplete == option.autocomplete &&
      this.choicesEquals(option)
    );
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
      choices: this.choices,
      min_value: this.minValue,
      max_value: this.maxValue,
      autocomplete: this.autocomplete,
    };
  }

  private choicesEquals(option: ApplicationCommandOption): boolean {
    const myChoices = this.choices;
    const theirChoices = option.choices;
    if (!myChoices && !theirChoices) return true;
    if (!myChoices || !theirChoices) return false;
    if (myChoices.length !== theirChoices.length) return false;
    myChoices.sort();
    theirChoices.sort();
    for (let i = 0; i < myChoices.length; i++) {
      if (myChoices[i].name !== theirChoices[i].name) return false;
      if (myChoices[i].value !== theirChoices[i].value) return false;
    }
    return true;
  }
}

export function number<R extends boolean = false, A extends boolean = false>(
  description: string,
  options?: {
    name?: string;
    required?: R;
    choices?: Choice<number>[];
    minValue?: number;
    maxValue?: number;
    autocomplete?: A;
  }
) {
  return new NumberOption<R, A>(
    description,
    options?.name,
    options?.required,
    options?.choices,
    options?.minValue,
    options?.maxValue,
    options?.autocomplete
  );
}
