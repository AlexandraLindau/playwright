import { test } from '../../tests/fixture';

export function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = `${this.constructor.name}.${context.name as string}`;
    return test.step(name, async () => target.call(this, ...args));
  };
}
