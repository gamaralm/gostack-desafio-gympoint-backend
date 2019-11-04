import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import StoreAnswerMail from '../jobs/StoreAnswerMail';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await helpOrder.update({
      answer_at: new Date(),
      ...req.body,
    });

    await Queue.add(StoreAnswerMail.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new RegistrationController();
