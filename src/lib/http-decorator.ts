export namespace HttpDecorator {

  export function route(route) {
    if (!route)
      throw new Error('Missing argument: route');

    return (target) => {
      target.prototype._routes.forEach((r) => { r.baseRoute = route; });
    };
  }

  export function get(route) {
    if (!route)
      throw new Error('Missing argument: route');

    return handle('get', route);
  }

  export function post(route) {
    if (!route)
      throw new Error('Missing argument: route');

    return handle('post', route);
  }

  function handle(verb, route) {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {

      if (!target._routes)
        setRoutesGetter(target);

      target._routes.push({ verb: verb, route: route, action: propertyKey });
    };
  }

  function setRoutesGetter(target: any) {
    target._routes = [];

    Object.defineProperty(target, 'routes', {
      get: () => { return target._routes; },
      enumerable: true,
      configurable: true
    });
  }
}