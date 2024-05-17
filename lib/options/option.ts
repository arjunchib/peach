import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Choice } from "../interfaces/interaction";

export abstract class Option<
  const N extends string = string,
  const V extends any = any,
  const R extends boolean = boolean,
  const A extends boolean = boolean
> {
  protected abstract readonly type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  protected _required = false as R;
  protected _autocomplete = false as A;
  protected _choices: Choice[] = [];
  private _value = {} as V;

  constructor(public name: N, public description: string) {}

  protected toApplicationCommandOption(): ApplicationCommandOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      required: this._required,
      choices: this._choices,
      autocomplete: this._autocomplete,
    };
  }

  protected equals(option: ApplicationCommandOption): boolean {
    return option.type === this.type &&
      this.description === option.description &&
      this.name === option.name &&
      this._required === option.required &&
      this._autocomplete === option.autocomplete &&
      this._choices
      ? this.choicesEquals(option)
      : true;
  }

  protected choicesEquals(option: ApplicationCommandOption): boolean {
    const myChoices = this._choices;
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
