import { Interaction } from "./interactions/interaction";
import { SlashInteraction } from "./interactions/slash_interaction";
import type { Option } from "./options/option";

export type JsType<T extends Option> = T extends { jsType: any }
  ? T["jsType"]
  : never;

// expands object types one level deep
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// expands object types recursively
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export function isSlashInteraction(
  interaction: Interaction
): interaction is SlashInteraction<any> {
  return interaction.type === 2;
}
