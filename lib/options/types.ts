import type { ExpandRecursively } from "../helpers";
import type { Option } from "./option";
import type { SubcommandGroupOption } from "./subcommand_group_option";
import type { SubcommandOption } from "./subcommand_option";

export type OptionValue<T extends Option> = T extends Option<any, infer V>
  ? V
  : never;

export type OptionOption<T extends Option> = T extends
  | SubcommandGroupOption<any, any, infer O>
  | SubcommandOption<any, any, infer O>
  ? O
  : never;

export type InteractionOption<T extends Option> = ExpandRecursively<
  InteractionOptionRequired<T> & InteractionOptionOptional<T>
>;

type InteractionOptionRequired<T extends Option> = {
  [P in T as P extends Option<any, any, true, any>
    ? P["name"]
    : never]: OptionValue<P>;
};

type InteractionOptionOptional<T extends Option> = {
  [P in T as P extends Option<any, any, false, any>
    ? P["name"]
    : never]?: OptionValue<P>;
};

export type AutocompleteOption<T extends Option> = {
  [P in T as P extends
    | Option<any, any, any, true>
    | SubcommandGroupOption
    | SubcommandOption
    ? P["name"]
    : never]?: P extends SubcommandGroupOption | SubcommandOption
    ? AutocompleteOption<OptionOption<P>>
    : { focused: boolean; value: OptionValue<P> };
};
