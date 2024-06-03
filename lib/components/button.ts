import type { Emoji } from "../interfaces/emoji";
import { BaseButton } from "./base_button";

export class Button extends BaseButton {
  style: 1 | 2 | 3 | 4 = 1;
  private _emoji?: Pick<Emoji, "id" | "name" | "animated">;
  private _customId: string;
  private _disabled: boolean = false;

  constructor(label: string) {
    super(label);
    this._customId = label;
  }

  toComponent() {
    return {
      ...super.toComponent(),
      emoji: this._emoji,
      custom_id: this._customId,
      disabled: this._disabled,
    };
  }

  emoji(value: Button["_emoji"]) {
    this._emoji = value;
    return this;
  }

  customId(value: string) {
    this._customId = value;
    return this;
  }

  disabled() {
    this._disabled = true;
    return this;
  }

  primary() {
    this.style = 1;
    return this;
  }

  secondary() {
    this.style = 2;
    return this;
  }

  success() {
    this.style = 3;
    return this;
  }

  danger() {
    this.style = 4;
    return this;
  }
}

export function button(label: string) {
  return new Button(label);
}
