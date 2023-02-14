import { adaptRoute } from '@/shared/infra/express/adapters';

import { Router } from 'express';

import {
  makeHttpGetBelvoWidgetTokenController
} from '@/domains/auth/factories/http';

const authRouter = Router();

authRouter
  .route('/get-belvo-widget-token')
  .get(
    adaptRoute(makeHttpGetBelvoWidgetTokenController())
  );

export { authRouter };
