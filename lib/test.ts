function chatInput<T>(value: {
  name: string;
  description: string;
  options: T;
}) {
  return new ChatInputCommand<T>();
}

class ChatInputCommand<T = any> {
  options!: T;
}

class ChatInputInteraction<T extends ChatInputCommand> {
  options!: T["options"];
}

const add = chatInput({
  name: "add",
  description: "Add me",
  options: {
    name: "string",
    url: "string",
  },
});

const play = chatInput({
  name: "play",
  description: "Play me",
  options: {
    name: "string",
  },
});

function createCommands<T>(commands: T): T {
  return {} as any;
}

const commands = createCommands({
  add,
  play,
});

type Interactions = ToInteraction<typeof commands>;

type ToInteraction<T extends Record<string, ChatInputCommand>> = {
  [P in keyof T]: ChatInputInteraction<T[P]>;
};

class MemeController {
  slash(interaction: Interactions["add"]) {
    interaction.options.name;
  }

  onClick() {}
}

class Route {
  constructor() {}
}

function slash<T extends new () => any>(
  name: string,
  controller: T,
  method: keyof InstanceType<T>
) {
  return new Route();
}

function customId<T extends new () => any>(
  customId: string | RegExp,
  controller: T,
  method?: keyof InstanceType<T>
) {
  return new Route();
}

const routes: Route[] = [
  slash("meme", MemeController, "slash"),
  customId(/^meme:add:/, MemeController, "onClick"),
];
