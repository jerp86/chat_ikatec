module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          name: 'Single_email',
          msg: 'Unfortunately this email has already been registered',
        },
        validate: {
          notEmpty: {
            name: 'Empty_field',
            msg: 'This field cannot be empty',
          },
          isEmail: {
            name: 'Email_field',
            msg: 'This field must be an email',
          },
        },
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
    return queryInterface.dropTable('users');
  },
};
