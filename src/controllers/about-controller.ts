import { BaseController } from '../lib/base-controller';
import { HttpDecorator } from '../lib/http-decorator';

@HttpDecorator.route('/about')
export class AboutController extends BaseController {

  constructor(request, response) {
    super(request, response);
  }

  @HttpDecorator.get('/')
  public async about() {
    return this.ok('Who, me?');
  }
}
