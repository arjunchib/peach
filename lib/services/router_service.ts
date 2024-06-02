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
    const route = this.config.routes.find((r) => r.matches(interaction));
    if (route) {
      await route.execute(interaction);
    } else {
      logger.router("No route matching interaction");
    }
  }
}
