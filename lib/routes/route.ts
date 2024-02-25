import type { Interaction } from "../interactions/interaction";

export abstract class Route {
  constructor(
    public controller: any,
    public method: string | number | symbol
  ) {}

  async execute(interaction: Interaction) {
    const controllerInstance = new this.controller();
    await controllerInstance[this.method](interaction);
  }
}
