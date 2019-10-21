import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(401).json({ error: 'Student already exists' });
    }

    try {
      await Student.create(req.body);

      return res.status(200).json();
    } catch (e) {
      return res.status(400).json({ error: `${e.name}: ${e.message}` });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    if (req.body.email && req.body.email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentExists) {
        return res.status(401).json({ error: 'Students already exists' });
      }
    }

    try {
      await student.update(req.body);

      return res.status(200).json();
    } catch (e) {
      return res.status(400).json({ error: `${e.name}: ${e.message}` });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    try {
      await student.destroy();

      return res.status(200).json();
    } catch (e) {
      return res.status(400).json({ error: `${e.name}: ${e.message}` });
    }
  }
}

export default new StudentController();
