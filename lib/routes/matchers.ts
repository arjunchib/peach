import { Route } from "./route";

export function customId<T extends new () => any>(
  customId: string | RegExp,
  controller: T,
  method?: keyof InstanceType<T>
) {
  return new Route();
}
