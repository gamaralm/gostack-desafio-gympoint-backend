import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.student_id },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const checkin = await Checkin.create({ student_id: req.params.student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
