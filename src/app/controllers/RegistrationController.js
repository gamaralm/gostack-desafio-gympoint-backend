import * as Yup from 'yup';
import { isBefore, parseISO, addMonths, format } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Queue from '../../lib/Queue';
import StoreRegistrationMail from '../jobs/StoreRegistrationMail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      where: { student_id: req.params.student_id },
    });

    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id } = req.body;
    const { student_id } = req.params;

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const start_date = parseISO(req.body.start_date);
    const today = parseISO(format(new Date(), 'yyyy-MM-dd'));
    if (isBefore(start_date, today)) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const end_date = addMonths(start_date, plan.duration);
    const price = plan.duration * plan.price;

    const student = await Student.findByPk(student_id);

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(StoreRegistrationMail.key, {
      student,
      plan,
      end_date,
    });

    return res.json(registration);
  }

  async show(req, res) {
    const { student_id, id } = req.params;
    const registration = await Registration.findOne({
      where: { student_id, id },
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists' });
    }

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, id } = req.params;
    const registration = await Registration.findOne({
      where: { student_id, id },
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists' });
    }

    const { plan_id } = req.body;
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const end_date = addMonths(registration.start_date, plan.duration);
    const price = plan.duration * plan.price;

    await registration.update({ plan_id, end_date, price });

    return res.json(registration);
  }

  async delete(req, res) {
    const { student_id, id } = req.params;
    const registration = await Registration.findOne({
      where: { student_id, id },
    });

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists' });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new RegistrationController();
