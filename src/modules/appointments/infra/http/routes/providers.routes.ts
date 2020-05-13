import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDailyAvailability from '../controllers/ProviderDailyAvailabilityController';
import ProviderMonthlyAvailability from '../controllers/ProviderMonthlyAvailabilityController';

const providersRouter = Router();

const providersController = new ProvidersController();
const pDC = new ProviderDailyAvailability();
const pMC = new ProviderMonthlyAvailability();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/day-availability', pDC.index);
providersRouter.get('/:provider_id/month-availability', pMC.index);

export default providersRouter;
