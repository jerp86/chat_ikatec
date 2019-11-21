import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(4)
        .max(20)
        .required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, name } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      try {
        user = await User.create({ name, email });
      } catch (err) {
        return res.status(450).json({ error: `Please` });
      }
    }

    return res.json({
      id: user.id,
      name: user.name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(4)
        .max(20),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }

      await user.update({ email });
    }

    if (name) {
      await user.update({ name });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async index(req, res) {
    const users = await User.findAll();

    if (!users) {
      return res.status(404).json({ error: 'Users not exists' });
    }

    return res.json(users);
  }

  async show(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  }
}

export default new UserController();
