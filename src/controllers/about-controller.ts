import { BaseController } from '../lib/base-controller';
import { get, route } from '../lib/http-decorator';

@route('/about')
export class AboutController extends BaseController {

  constructor(request, response) {
    super(request, response);
  }

  @get('/')
  public async about() {
    return this.ok('Who, me?');
  }
}
