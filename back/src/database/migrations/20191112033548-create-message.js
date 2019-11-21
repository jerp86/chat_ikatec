module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            name: 'Empty_field',
            msg: 'This field cannot be empty',
          },
          max: {
            name: 'Field_size',
            args: [4, 20],
            msg: 'This field must contain between 4 and 20 characters',
          },
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            name: 'Empty_field',
            msg: 'This field cannot be empty',
          },
          len: {
            name: 'Field_size',
            args: [4, 20],
            msg: 'This field must contain between 4 and 20 characters',
          },
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('messages');
  },
};
