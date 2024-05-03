import type { Interaction } from "../interactions/interaction";
import { logger } from "../logger";

export abstract class Route {
  constructor(
    public controller: any,
    public method: string | number | symbol
  ) {}

  async execute(interaction: Interaction) {
    logger.router(
      `Routing to ${this.controller?.name}#${this.method.toString()}`
    );
    const controllerInstance = new this.controller();
    await controllerInstance[this.method](interaction);
  }
}
