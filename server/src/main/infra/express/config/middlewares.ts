import { Express } from 'express';

import {
  bodyParser,
  corsMiddleware,
  contentType,
  helmetMiddleware,
  pinoHttp,
  limiter,
} from '@/main/infra/express/middlewares';

import { env } from '@/main/config';

export default (app: Express): void => {
  app.use(helmetMiddleware);
  app.use(bodyParser);
  app.use(corsMiddleware);
  app.use(contentType);
  app.use(limiter);

  if (env.application.mode === 'production') {
    app.use(pinoHttp);
  }
};
