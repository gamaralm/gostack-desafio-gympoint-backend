import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class RegistrationController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({ where: { answer_at: null } });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id } = req.params;

    const helpOrder = await HelpOrder.create({
      student_id,
      ...req.body,
    });

    return res.json(helpOrder);
  }
}

export default new RegistrationController();
