import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class StoreRegistrationMail {
  get key() {
    return 'storeRegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, end_date } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Realizada',
      template: 'storeRegistration',
      context: {
        student: student.name,
        plan: plan.title,
        price: plan.price,
        endDate: format(parseISO(end_date), 'dd/MM/yyyy'),
      },
    });
  }
}

export default new StoreRegistrationMail();
