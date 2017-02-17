import { BaseController } from '../lib/base-controller';

export class HomeController extends BaseController {

  constructor(request, response) {
    super(request, response);
  }

  public static get routes() {
    return [{ verb: 'get', route: '/home', action: 'getHome' },
    { verb: 'get', route: '/home/data', action: 'getHomeData' }];
  }

  public async getHome(name: string) {
    return this.ok({ hi: name });
  }

  public async  getHomeData() {
    return this.badRequest('ops');
  }
}
