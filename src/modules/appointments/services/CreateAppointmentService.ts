import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't set an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't create an appointment outside business hours",
      );
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already taken');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormated = format(date, "dd/MM/yyyy 'às' HH'h'mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormated}`,
    });

    const provider_info = await this.usersRepository.findById(provider_id);

    if (!provider_info) {
      throw new AppError('Provider not Found');
    }

    const emailTemplateProvider = path.resolve(
      __dirname,
      '..',
      'views',
      'create_appointment_provider.hbs',
    );

    await this.mailProvider.sendMail({
      to: { name: provider_info.name, email: provider_info.email },
      subject: 'Novo agendamento!',
      templateData: {
        file: emailTemplateProvider,
        variables: {
          name: provider_info.name,
          data: dateFormated,
        },
      },
    });

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `Agendamento para o dia ${dateFormated} entregue com sucesso.`,
    });

    const client_info = await this.usersRepository.findById(user_id);

    if (!client_info) {
      throw new AppError('Provider not Found');
    }

    const emailTemplateClient = path.resolve(
      __dirname,
      '..',
      'views',
      'create_appointment_client.hbs',
    );

    await this.mailProvider.sendMail({
      to: { name: client_info.name, email: client_info.email },
      subject: 'Novo agendamento!',
      templateData: {
        file: emailTemplateClient,
        variables: {
          name: client_info.name,
          data: dateFormated,
        },
      },
    });

    return appointment;
  }
}

export default CreateAppointmentService;
