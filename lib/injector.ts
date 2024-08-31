import { logger } from "./logger";

// @ts-ignore
export class InjectionToken<T = any> {
  constructor(public name?: string) {}
}

export type Token<T = any> = (new () => T) | InjectionToken<T>;

export class DependencyProvider {
  dependencies = new Map<Token, any>();
}

export function inject<T>(token: new () => T, initialValue?: T): T;
export function inject<T>(token: InjectionToken<T>, initialValue?: T): T;
export function inject<T>(token: Token, initialValue?: T): T {
  if (rootProvider.dependencies.has(token)) {
    logger.injector("Found dependency", token.name);
    return rootProvider.dependencies.get(token);
  } else {
    logger.injector(`Creating dependency`, token.name);
    const dependency = initialValue
      ? initialValue
      : token instanceof InjectionToken
      ? undefined
      : new token();
    rootProvider.dependencies.set(token, dependency);
    return dependency;
  }
}

export function lazyInject<T>(token: new () => T): T | undefined;
export function lazyInject<T>(token: InjectionToken<T>): T | undefined;
export function lazyInject<T>(token: Token): T | undefined {
  return rootProvider.dependencies.get(token);
}

export const rootProvider = new DependencyProvider();
