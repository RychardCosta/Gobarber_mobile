import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/appointmentRepository';

import ensureAuthenticate from '../middlewires/ensureAuthenticate';

import CreateAppointmentRepository from '../services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuthenticate);
appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentRoutes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createNewAppointment = new CreateAppointmentRepository();

    const appointment = await createNewAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default appointmentRoutes;
