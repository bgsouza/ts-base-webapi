import "reflect-metadata";

import * as express from 'express';
import * as uuid from 'node-uuid';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { BaseController } from './lib/base-controller';

export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.registerMiddlewares();
    this.registerRoutes();
  }

  private registerRoutes() {
    BaseController.bindRoutes(this.app);
  }

  private registerMiddlewares() {
    this.app.set('x-powered-by', false);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(morgan(':method :url :status - :response-time ms'));
    this.app.use((req: any, res, next) => {
      req.id = uuid.v4();
      res.setHeader('X-Reqquest-Id', req.id);
      next();
    });
  }
}
