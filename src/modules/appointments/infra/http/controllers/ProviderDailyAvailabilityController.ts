import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDailyAvailability from '@modules/appointments/services/ListProviderDailyAvailabilityService';

export default class ProviderDailyAvailability {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.body;

    const listProviderDailyAvailability = container.resolve(
      ListProviderDailyAvailability,
    );

    const availability = await listProviderDailyAvailability.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}
