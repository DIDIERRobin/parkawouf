/**
 Matches a [`class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

 @category Class
 */
export type Class<T, Arguments extends unknown[] = any[]> = {
  prototype: T;
  new(...arguments_: Arguments): T;
};

/**
 Matches a [`class` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

 @category Class
 */
export type Constructor<T, Arguments extends unknown[] = any[]> = new(...arguments_: Arguments) => T;
