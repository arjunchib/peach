import { APP_CONFIG } from "../bootstrap";
import { inject } from "../injector";
import { logger } from "../logger";

export class RouterService {
  private config = inject(APP_CONFIG);

  async routeTo(interaction: any) {
    const route = this.config.routes.find((r) => r.matches(interaction));
    if (route) {
      await route.execute(interaction);
    } else {
      logger.router("No route matching interaction");
    }
  }
}
