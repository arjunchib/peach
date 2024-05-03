import type { Route } from "..";
import type { Commands } from "./commands/create_commands";
import { InjectionToken, inject } from "./injector";
import { CommandService } from "./services/command_service";
import { DiscordRestService } from "./services/discord_rest_service";
import { GatewayService } from "./services/gateway_service";
import { RouterService } from "./services/router_service";
import { StoreService } from "./services/store_service";

declare global {
  var cachedGatewayService: GatewayService | undefined;
}

export interface AppConfig {
  token: string;
  applicationId: string;
  commands: Commands;
  routes: Route[];
  intents?: number;
  syncCommands?: {
    global?: boolean;
    guildId?: string;
  };
  debug?: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>("APP_CONFIG");

export async function bootstrap(config: AppConfig) {
  inject(APP_CONFIG, config);
  const storeService = inject(StoreService);
  await storeService.init();
  const commandService = inject(CommandService);
  await commandService.sync();
  const gatewayService = inject(
    GatewayService,
    globalThis.cachedGatewayService
  );
  globalThis.cachedGatewayService ??= gatewayService;
  await gatewayService.init(
    config,
    inject(DiscordRestService),
    inject(RouterService),
    storeService
  );
}
