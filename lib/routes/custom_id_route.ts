import { ComponentInteraction } from "../interactions/component_interaction";
import type { Interaction } from "../interactions/interaction";
import { Route } from "./route";

export class CustomIdRoute<T extends new () => any> extends Route {
  constructor(
    public matcher: string | RegExp,
    controller: T,
    method: keyof InstanceType<T>
  ) {
    super(controller, method);
  }

  matches(interaction: Interaction): boolean {
    if (interaction.type !== 3) return false;
    if (!interaction.data?.custom_id) return false;
    if (typeof this.matcher === "string") {
      return interaction.data?.custom_id === this.matcher;
    } else {
      return this.matcher.test(interaction.data?.custom_id);
    }
  }

  async execute(interaction: Interaction): Promise<void> {
    const itn = new ComponentInteraction(interaction);
    await this.forwardToController(itn);
  }
}

export class CustomIdRouteFrom {
  constructor(public matcher: string | RegExp) {}

  to<K extends new () => any>(controller: K, method: keyof InstanceType<K>) {
    return new CustomIdRoute(this.matcher, controller, method);
  }
}

export function customIdRoute(
  ...args: ConstructorParameters<typeof CustomIdRouteFrom>
) {
  return new CustomIdRouteFrom(...args);
}
