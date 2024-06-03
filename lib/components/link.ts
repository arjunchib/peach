import { BaseButton } from "./base_button";

export class Link extends BaseButton {
  style = 5 as const;

  constructor(label: string, public url: string) {
    super(label);
  }

  toComponent() {
    return {
      ...super.toComponent(),
      url: this.url,
    };
  }
}

export function link(label: string, url: string) {
  return new Link(label, url);
}
