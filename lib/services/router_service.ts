import { APP_CONFIG } from "../bootstrap";
import { inject } from "../injector";
import { AutocompleteInteraction } from "../interactions/autocomplete_interaction";
import { MessageInteraction } from "../interactions/message_interaction";
import { SlashInteraction } from "../interactions/slash_interaction";
import { UserInteraction } from "../interactions/user_interaction";
import type { DiscordInteraction } from "../interfaces/interaction";
import { logger } from "../logger";
import { AutocompleteRoute } from "../routes/autocomplete_route";
import { CommandRoute } from "../routes/command_route";

export class RouterService {
  private config = inject(APP_CONFIG);

  async routeTo(interaction: DiscordInteraction) {
    let route = this.getMatchingRoute(interaction);
    if (route) {
      await route.execute(this.createInteraction(interaction));
    } else {
      logger.router("No route matching interaction");
    }
  }

  private getMatchingRoute(interaction: DiscordInteraction) {
    if (interaction.type === 2) {
      return this.config.routes.find(
        (route) =>
          route instanceof CommandRoute &&
          route.command.type === interaction.data?.type &&
          route.command.name === interaction.data.name
      );
    } else if (interaction.type === 4) {
      return this.config.routes.find(
        (route) =>
          route instanceof AutocompleteRoute &&
          route.command.name === interaction.data?.name
      );
    }
  }

  private createInteraction(rawInteraction: DiscordInteraction) {
    switch (rawInteraction.data?.type) {
      case 1:
        if (rawInteraction.type === 4) {
          return new AutocompleteInteraction(rawInteraction);
        }
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
