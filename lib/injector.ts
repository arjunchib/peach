// @ts-ignore
export class InjectionToken<T = any> {}

export type Token<T = any> = (new () => T) | InjectionToken<T>;

export class DependencyProvider {
  dependencies = new Map<Token, any>();
}

export function inject<T>(token: new () => T, initialValue?: T): T;
export function inject<T>(token: InjectionToken<T>, initialValue?: T): T;
export function inject<T>(token: Token, initialValue?: T): T {
  if (rootProvider.dependencies.has(token)) {
    console.log("Found dependency", token);
    return rootProvider.dependencies.get(token);
  } else {
    console.log("Creating dependency", token);
    const dependency = initialValue
      ? initialValue
      : token instanceof InjectionToken
      ? undefined
      : new token();
    rootProvider.dependencies.set(token, dependency);
    return dependency;
  }
}

export const rootProvider = new DependencyProvider();
