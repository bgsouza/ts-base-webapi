import * as utils from './utils';

export class DependencyContainer {

  private dependencies;

  constructor() {
    this.dependencies = {};
  }

  public registerValue(name: string, value: any) {
    name = name.toLowerCase();
    this.dependencies[name] = value;
  }

  public registerConstructor(ctor: any) {
    let name = ctor.name.toLowerCase();
    this.dependencies[name] = {
      name: name,
      invoke: (values) => Reflect.construct(ctor, values),
      params: utils.getFunctionParameters(ctor)
    };
  }

  public registerFactory(name: string, func: any) {
    name = name.toLowerCase();
    this.dependencies[name] = {
      name: name,
      invoke: (values) => func.apply(null, values),
      params: utils.getFunctionParameters(func)
    };
  }

  public resolve(name: string) {
    name = name.toLowerCase();
    let dep = this.dependencies[name] || null;

    if (dep == null) return null;

    if (!dep.invoke)
      return dep;

    let params = this.dependencies[name].params.map((d) => this.resolve(d));
    return dep.invoke(params);
  }
}