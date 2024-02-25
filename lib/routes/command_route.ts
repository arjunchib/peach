import { Route } from "./route";

export class CommandRoute extends Route {
  constructor(
    public type: 1 | 2 | 3,
    public name: string,
    controller: any,
    method: string | number | symbol
  ) {
    super(controller, method);
  }
}
