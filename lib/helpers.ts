import type { Option } from "./options/option";

export type JsType<T extends Option> = T extends { jsType: any }
  ? T["jsType"]
  : never;
