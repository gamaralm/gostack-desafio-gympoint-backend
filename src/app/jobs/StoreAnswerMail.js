import Mail from '../../lib/Mail';

class StoreAnswerMail {
  get key() {
    return 'storeAnswerMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Auxílio Respondido',
      template: 'storeAnswer',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    });
  }
}

export default new StoreAnswerMail();
