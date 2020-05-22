import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDailyAvailability from '@modules/appointments/services/ListProviderDailyAvailabilityService';

export default class ProviderDailyAvailability {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.query;

    const listProviderDailyAvailability = container.resolve(
      ListProviderDailyAvailability,
    );

    const availability = await listProviderDailyAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(availability);
  }
}
