import { BaseController } from '../lib/base-controller';
import { HttpDecorator } from '../lib/http-decorator';

export class HomeController extends BaseController {

  constructor(request, response) {
    super(request, response);
  }

  @HttpDecorator.get('/home/:name')
  public async home(name: string) {
    return this.ok({ hi: `Hello, ${name}!` });
  }
}
