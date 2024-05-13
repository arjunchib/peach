import type { Command } from "../commands/command";
import { Route } from "./route";

export class CustomIdRoute<T extends new () => any> extends Route {
  constructor(
    public matcher: string | RegExp,
    controller: T,
    method: keyof InstanceType<T>
  ) {
    super(controller, method);
  }
}
export function customIdRoute<T extends new () => any>(
  ...args: ConstructorParameters<typeof CustomIdRoute<T>>
) {
  return new CustomIdRoute(...args);
}
