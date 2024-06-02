import type { Interaction } from "../interactions/interaction";
import type { DiscordInteraction } from "../interfaces/interaction";
import { logger } from "../logger";

export abstract class Route {
  constructor(
    public controller: any,
    public method: string | number | symbol
  ) {}

  abstract matches(interaction: DiscordInteraction): boolean;

  abstract execute(interaction: DiscordInteraction): Promise<void>;

  protected async forwardToController(interaction: Interaction) {
    logger.router(
      `Routing to ${this.controller?.name}#${this.method.toString()}`
    );
    const controllerInstance = new this.controller();
    await controllerInstance[this.method](interaction);
  }
}
