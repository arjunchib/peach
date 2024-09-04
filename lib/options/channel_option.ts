import type { ApplicationCommandOption } from "../interfaces/application_command";
import type { Channel } from "../interfaces/channel";
import type { User } from "../interfaces/user";
import { Option } from "./option";

export class ChannelOption<
  const N extends string = string,
  const V extends Channel = Channel,
  const R extends boolean = false
> extends Option<N, V, R, false> {
  readonly type = 7;

  private _channelTypes: ApplicationCommandOption["channel_types"];

  constructor(name: N, description: string) {
    super(name, description);
  }

  required() {
    this._required = true as R;
    return this as ChannelOption<N, V, true>;
  }

  equals(option: ApplicationCommandOption): boolean {
    return super.equals(option);
  }

  channelTypes(
    value: (0 | 1 | 2 | 3 | 4 | 5 | 10 | 11 | 12 | 13 | 14 | 15 | 16)[]
  ) {
    this._channelTypes = value;
    return this;
  }

  toApplicationCommandOption(): ApplicationCommandOption {
    return {
      ...super.toApplicationCommandOption(),
      channel_types: this._channelTypes,
    };
  }
}

export function channel<const N extends string = string>(
  name: N,
  description: string
) {
  return new ChannelOption<N>(name, description);
}
