import type { Emoji } from "../interfaces/emoji";
import { Component } from "./component";

export abstract class BaseButton extends Component {
  private type = 2;
  abstract style: 1 | 2 | 3 | 4 | 5;

  constructor(public label: string) {
    super();
  }

  toComponent() {
    return {
      type: this.type,
      style: this.style,
      label: this.label,
    };
  }
}
