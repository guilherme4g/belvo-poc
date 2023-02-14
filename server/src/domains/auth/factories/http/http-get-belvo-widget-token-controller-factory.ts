import {
  HttpGetBelvoWidgetTokenController,
} from '@/domains/auth/interface/http';
import { pinoLoggerLocal } from '@/shared/infra/logs';

export const makeHttpGetBelvoWidgetTokenController = (): HttpGetBelvoWidgetTokenController => {
  const logger = pinoLoggerLocal;

  return new HttpGetBelvoWidgetTokenController(logger);
};
