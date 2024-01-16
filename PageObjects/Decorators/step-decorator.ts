// eslint-disable-next-line import/no-cycle
import { test } from '../../fixtures/fixture';

export function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = `${this.constructor.name}.${context.name as string}`;
    // eslint-disable-next-line @typescript-eslint/return-await
    return test.step(name, async () => await target.call(this, ...args));
  };
}
