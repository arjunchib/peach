import type { Route } from "..";
import type { Command } from "./commands/command";
import { InjectionToken, inject } from "./injector";
import { logger } from "./logger";
import { CommandService } from "./services/command_service";
import { GatewayService } from "./services/gateway_service";
import { StoreService } from "./services/store_service";
import { WebhookService } from "./services/webhook_service";

declare global {
  var cachedGatewayService: GatewayService | undefined;
}

export interface BaseConfig {
  applicationId: string;
  token: string;
  commands: Record<string, Command>;
  routes: Route[];
  intents?: number;
  syncCommands?: {
    global?: boolean;
    guildId?: string;
  };
  debug?: boolean;
  error?: (error: unknown) => Promise<void> | void;
}

export interface WebhookConfig extends BaseConfig {
  publicKey: string;
}

export interface GatewayConfig extends BaseConfig {}

export const WEBHOOK_CONFIG = new InjectionToken<WebhookConfig>(
  "WEBHOOK_CONFIG"
);
export const GATEWAY_CONFIG = new InjectionToken<GatewayConfig>(
  "GATEWAY_CONFIG"
);
export const APP_CONFIG = new InjectionToken<BaseConfig>("APP_CONFIG");

export async function bootstrapGateway(config: GatewayConfig) {
  inject(GATEWAY_CONFIG, config);
  inject(APP_CONFIG, config);
  await bootstrap(config);
  const gatewayService = inject(
    GatewayService,
    globalThis.cachedGatewayService
  );
  globalThis.cachedGatewayService ??= gatewayService;
  await gatewayService.init();
}

export async function bootstrapWebhook(config: WebhookConfig) {
  inject(WEBHOOK_CONFIG, config);
  inject(APP_CONFIG, config);
  await bootstrap(config);
  const webhookService = inject(WebhookService);
  return webhookService.fetch.bind(webhookService);
}

async function bootstrap(config: BaseConfig) {
  logger.init(!!config.debug);
  const storeService = inject(StoreService);
  await storeService.init();
  const commandService = inject(CommandService);
  await commandService.sync();
}
