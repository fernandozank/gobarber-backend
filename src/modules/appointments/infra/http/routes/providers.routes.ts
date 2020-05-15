import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

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

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  pDC.index,
);

providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  pMC.index,
);

export default providersRouter;
