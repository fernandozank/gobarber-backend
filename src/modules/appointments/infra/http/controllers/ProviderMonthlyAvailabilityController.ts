import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthlyAvailabilityService from '@modules/appointments/services/ListProviderMonthlyAvailabilityService';

export default class ProviderMonthlyAvailability {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.query;

    const listProviderMonthlyAvailability = container.resolve(
      ListProviderMonthlyAvailabilityService,
    );

    const availability = await listProviderMonthlyAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
    });

    return response.json(availability);
  }
}
