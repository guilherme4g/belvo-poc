import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { belvoConnector } from '@/shared/infra/belvo';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpGetBelvoWidgetTokenRequest {

}

export class HttpGetBelvoWidgetTokenController implements HttpController {
  private logger: ILoggerLocal;

  constructor(
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ httpController: 'get-belvo-widget-token'});
  }

  async handle(httpRequest: HttpGetBelvoWidgetTokenRequest): Promise<HttpResponse> {

    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    try{
      const belvo = await belvoConnector.connect();

      const token = await belvo.widgetToken.create();

      return ok(token);
    } catch (error) {
      console.log(error)
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
