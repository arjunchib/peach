// import type { Button } from "./button";
// import type { Link } from "./link";

// export type Component = Link | Button;

export abstract class Component {
  abstract toComponent(): any;
}
