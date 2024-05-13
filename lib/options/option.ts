import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";

export abstract class Option<
  N extends string = string,
  R extends boolean = boolean,
  A extends boolean = boolean,
  C extends string | number = string | number
> {
  protected abstract readonly type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  protected abstract readonly jsType: any;

  constructor(
    public name: N,
    public description: string,
    public required?: R,
    public autocomplete?: A,
    public choices?: Choice<C>[]
  ) {}

  protected toApplicationCommandOption(): ApplicationCommandOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this.required,
      choices: this.choices,
      autocomplete: this.autocomplete,
    };
  }

  protected equals(option: ApplicationCommandOption): boolean {
    return option.type === this.type &&
      this.description === option.description &&
      this.name === option.name &&
      this.required === option.required &&
      this.autocomplete === option.autocomplete &&
      this.choices
      ? this.choicesEquals(option)
      : true;
  }

  protected choicesEquals(option: ApplicationCommandOption): boolean {
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
