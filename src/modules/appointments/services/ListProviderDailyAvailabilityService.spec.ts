import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDailyAvailabilityService from './ListProviderDailyAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDailyAvailabilityService: ListProviderDailyAvailabilityService;

describe('ListProviderDailyAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDailyAvailabilityService = new ListProviderDailyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the daily availability of a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      // const customDate = new Date(Date.now());

      // customDate.setHours(customDate.getHours() - 3);
      return new Date(2020, 4, 20, 12).getTime();
    });

    const availability = await listProviderDailyAvailabilityService.execute({
      provider_id: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
