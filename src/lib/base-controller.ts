import { Request, Response, Application } from 'express';
import * as utils from './uitls';
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

        controller.routes.forEach((map) => {
          let verb = (map.verb || 'get').toLowerCase();

          app[verb](map.route, (req, res) => {
            let instance = new controller(req, res);
            let params = utils.getFunctionParameters(instance[map.action])
            instance[map.action](req.query[params[0]]);
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