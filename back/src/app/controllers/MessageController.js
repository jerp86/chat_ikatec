import * as Yup from 'yup';
import Message from '../models/Message';

class MessageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      message: Yup.string()
        .max(255)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const msg = await Message.create({
      message: req.body.message,
      name: req.userName,
      user_id: req.userId,
    });

    const ownerSocket = req.connectedUsers[req.userId];

    if (ownerSocket) {
      req.io.emit('message', msg);
    }

    return res.json(msg);
  }

  async index(req, res) {
    const page = req.query.page || 1;
    const limit = 30;

    const { count } = await Message.findAndCountAll({});

    const messages = await Message.findAll({
      order: [['created_at', 'DESC']],
      attributes: ['id', 'message', 'name'],
      limit,
      offset: limit * page - limit,
    });

    return res.json({ count, messages });
  }
}

export default new MessageController();
