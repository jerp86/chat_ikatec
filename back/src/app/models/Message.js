import Sequelize, { Model } from 'sequelize';

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        message: Sequelize.STRING,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Message;
