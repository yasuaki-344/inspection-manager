export class DIContainer {
  private readonly container: { [key: string]: any } = {};

  register(key: string, object: any) {
    this.container[key] = object;
  }

  inject(key: string): any {
    if (key in this.container) {
      return this.container[key];
    }
    throw new Error(`${key} is not registered as dependency`);
  }
}
