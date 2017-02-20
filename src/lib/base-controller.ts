import { Request, Response, Application } from 'express';
import { DependencyManager } from './dependency-manager';
import * as utils from './utils';
import * as  fs from 'fs';

export class BaseController {

  private request: Request;
  private response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  public static bindRoutes(app: Application) {
    let controllers_dir = __dirname + '/../controllers/';

    let files = fs.readdirSync(controllers_dir).filter(f => f.endsWith('.js'));

    files.forEach((file) => {
      let controller_file = require(controllers_dir + file);

      for (let name in controller_file) {
        if (!name) return;

        let controller = controller_file[name];

        controller.prototype.routes.forEach((route) => {
          let verb = (route.verb || 'get').toLowerCase();

          let fullRoute = route.route;
          if (route.baseRoute)
            fullRoute = `${route.baseRoute}${route.route}`;

          app[verb](fullRoute, (request, response) => {
            let dependencyManager = new DependencyManager();

            dependencyManager.registerValue('request', request);
            dependencyManager.registerValue('response', response);
            dependencyManager.registerConstructor(controller);

            let instance = dependencyManager.resolve(controller.name);

            let params = utils.getFunctionParameters(instance[route.action]);
            let values = params.map((p) => utils.getParameterValue(request, p));

            instance[route.action].apply(instance, values);
          });
        });
      }
    });
  }

  private static getParam(request: Request, param: string) {
    if (param == 'body') return request.body;
    if (param == 'request') return request;
    return request.query[param] || request.query[param];
  }

  public ok(obj?: any) {
    this.response.status(200).send(obj);
  }

  public badRequest(err?: string) {
    this.response.status(400).send({ err: err });
  }

  public internalServerError(err?: string) {
    this.response.status(500).send({ err: err });
  }

  public forbiden() {
    this.response.status(401).send();
  }

  public notFound() {
    this.response.status(404).send();
  }
}