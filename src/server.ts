import * as express from 'express';
import { BaseController } from './lib/base-controller';

export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.registerRoutes();
  }

  private registerRoutes() {
    BaseController.bindRoutes(this.app);
  }
}
