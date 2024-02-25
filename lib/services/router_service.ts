import { APP_CONFIG } from "../bootstrap";
import { inject } from "../injector";
import { MessageInteraction } from "../interactions/message_interaction";
import { SlashInteraction } from "../interactions/slash_interaction";
import { UserInteraction } from "../interactions/user_interaction";
import type { DiscordInteraction } from "../interfaces/interaction";
import { CommandRoute } from "../routes/command_route";

export class RouterService {
  private config = inject(APP_CONFIG);

  async routeTo(interaction: DiscordInteraction) {
    if (interaction.type === 2) {
      const route = this.config.routes.find(
        (route) =>
          route instanceof CommandRoute &&
          route.type === interaction.data?.type &&
          route.name === interaction.data.name
      );
      if (this.config.debug && route) {
        console.log(
          `Routing to ${route?.controller?.name}#${route?.method.toString()}`
        );
      }
      await route?.execute(this.createInteraction(interaction));
    }
  }

  private createInteraction(rawInteraction: DiscordInteraction) {
    switch (rawInteraction.data?.type) {
      case 1:
        return new SlashInteraction(rawInteraction);
      case 2:
        return new UserInteraction(rawInteraction);
      case 3:
        return new MessageInteraction(rawInteraction);
      default:
        throw new Error("Can't create interaction!");
    }
  }
}
