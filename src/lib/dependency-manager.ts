import { DependencyContainer } from './dependency-container';

export class DependencyManager {

  private dependencies: DependencyContainer;

  constructor() {
    this.dependencies = new DependencyContainer();

    this.registerDependencies();
  }

  public registerValue(name: string, value: any) {
    this.dependencies.registerValue(name, value);
  }

  public registerConstructor(ctor: Object) {
    this.dependencies.registerConstructor(ctor);
  }

  public registerFactory(name: string, func: any) {
    this.dependencies.registerFactory(name, func);
  }

  public resolve(name: string) {
    return this.dependencies.resolve(name);
  }

  private registerDependencies() {
    // ... Add dependencies
  }
}