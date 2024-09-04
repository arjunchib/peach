import { SlashCommand } from "../commands/slash_command";
import { Component } from "../components/component";
import { lazyInject } from "../injector";
import type {
  ApplicationCommandData,
  MessageInteractionResponseData,
} from "../interfaces/interaction";
import { SubcommandGroupOption } from "../options/subcommand_group_option";
import type { SubcommandOption } from "../options/subcommand_option";
import { WebhookService } from "../services/webhook_service";
import { Interaction } from "./interaction";

export interface SlashInteraction<T> {
  type: 2;
  data: ApplicationCommandData;
}

export class SlashInteraction<T> extends Interaction {
  private webhookService = lazyInject(WebhookService);

  private _options: any;

  constructor(
    interaction: any,
    private command: SlashCommand | SubcommandGroupOption | SubcommandOption
  ) {
    super(interaction);
  }

  async respondWith(
    response: string | MessageInteractionResponseData | Component[][]
  ) {
    if (typeof response === "string") {
      response = { content: response };
    }
    if (Array.isArray(response)) {
      const components = response.map((row) => {
        const components = row.map((comp) => comp.toComponent());
        return { type: 1, components };
      });
      response = { content: "", components };
    }
    // console.log(response.components?.[0]?.[0]);
    if (response.components?.[0]?.[0] instanceof Component) {
      const components = response.components.map((row) => {
        const components = row.map((comp: Component) => comp.toComponent());
        return { type: 1, components };
      });
      // console.log(components);
      response.components = components;
    }
    if (this.webhookService) {
      const [resolve, reject] =
        this.webhookService.resolvers.get(this.id) ?? [];
      if (!resolve || !reject) {
        throw new Error("Missing interaction resolvers");
      }
      try {
        resolve({ type: 4, data: response });
      } catch (e) {
        reject(e);
      }
    } else {
      await this.discordRestService.createInteractionResponse(
        this.id,
        this.token,
        { type: 4, data: response }
      );
    }
  }

  async followupWith(
    response: string | MessageInteractionResponseData | Component[][]
  ) {
    if (typeof response === "string") {
      response = { content: response };
    }
    if (Array.isArray(response)) {
      const components = response.map((row) => {
        const components = row.map((comp) => comp.toComponent());
        return { type: 1, components };
      });
      response = { content: "", components };
    }
    if (response.components?.[0]?.[0] instanceof Component) {
      const components = response.components.map((row) => {
        const components = row.map((comp: Component) => comp.toComponent());
        return { type: 1, components };
      });
      response.components = components;
    }
    await this.discordRestService.createFollowupMessage(this.token, {
      ...response,
    });
  }

  async defer() {
    await this.discordRestService.createInteractionResponse(
      this.id,
      this.token,
      { type: 5 }
    );
  }

  async editResponse(
    response: string | MessageInteractionResponseData | Component[][]
  ) {
    if (typeof response === "string") {
      response = { content: response };
    }
    if (Array.isArray(response)) {
      const components = response.map((row) => {
        const components = row.map((comp) => comp.toComponent());
        return { type: 1, components };
      });
      response = { content: "", components };
    }
    // console.log(response.components?.[0]?.[0]);
    if (response.components?.[0]?.[0] instanceof Component) {
      const components = response.components.map((row) => {
        const components = row.map((comp: Component) => comp.toComponent());
        return { type: 1, components };
      });
      // console.log(components);
      response.components = components;
    }
    await this.discordRestService.editOriginalInteractionResponse(
      this.token,
      response
    );
  }

  public options(): T {
    if (this._options) return this._options;
    this._options = {};
    for (const option of this.getRawOptions() ?? []) {
      if (option.type === 6) {
        const user = this.data?.resolved?.users?.[option.value as any];
        (this._options as any)[option.name] = user;
      } else if (option.type === 7) {
        const channel = this.data?.resolved?.channels?.[option.value as any];
        (this._options as any)[option.name] = channel;
      } else {
        (this._options as any)[option.name] = option.value;
      }
    }
    return this._options;
  }

  private getRawOptions() {
    if (this.command instanceof SlashCommand) {
      return this.data?.options;
    } else if (this.command instanceof SubcommandGroupOption) {
      return this.data?.options?.[0].options;
    } else {
      if (this.data?.options?.[0]?.options?.[0]?.options) {
        return this.data?.options?.[0]?.options?.[0]?.options;
      } else {
        return this.data?.options?.[0]?.options;
      }
    }
  }
}
