import { Router } from 'express';

import { adaptRoute } from '@/shared/infra/express/adapters';
import { HealthCheckController } from '@/shared/interface/http/controllers';

const healthCheckRouter = Router();

healthCheckRouter
  .route('/get-belvo-token')
  .get(adaptRoute(new HealthCheckController()));

export { healthCheckRouter };
