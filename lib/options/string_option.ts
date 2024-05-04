import type { ApplicationCommandOption } from "../interfaces/application_command";
import { Option } from "./option";

export class StringOption<
  R extends boolean = false,
  A extends boolean = false
> extends Option<R> {
  readonly type = 3;
  readonly jsType!: string;

  constructor(
    description: string,
    name?: string,
    required?: R,
    public choices?: string[],
    public minLength?: number,
    public maxLength?: number,
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
      this.minLength === option.min_length &&
      this.maxLength === option.max_length &&
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
      min_length: this.minLength,
      max_length: this.maxLength,
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
      if (myChoices[i] !== theirChoices[i]) return false;
    }
    return true;
  }
}

export function string<R extends boolean = false, A extends boolean = false>(
  description: string,
  options?: {
    name?: string;
    required?: R;
    choices?: string[];
    minLength?: number;
    maxLength?: number;
    autocomplete?: A;
  }
) {
  return new StringOption<R, A>(
    description,
    options?.name,
    options?.required,
    options?.choices,
    options?.minLength,
    options?.maxLength,
    options?.autocomplete
  );
}
