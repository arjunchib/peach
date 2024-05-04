import { Route } from "./route";

export class AutocompleteRoute extends Route {
  constructor(
    public name: string,
    controller: any,
    method: string | number | symbol
  ) {
    super(controller, method);
  }
}
