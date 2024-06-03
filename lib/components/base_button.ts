import type { Emoji } from "../interfaces/emoji";

export abstract class BaseButton {
  private type = 2;
  abstract style: 1 | 2 | 3 | 4 | 5;

  constructor(public label: string) {}

  toComponent() {
    return {
      type: this.type,
      style: this.style,
      label: this.label,
    };
  }
}
