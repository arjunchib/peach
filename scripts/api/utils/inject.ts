const injectees = new Map<new () => any, any>();

export function inject<T>(ctor: new () => T): T {
  const injectee = injectees.get(ctor);
  if (injectee) {
    return injectee;
  } else {
    const injectee = new ctor();
    injectees.set(ctor, injectee);
    return injectee;
  }
}
