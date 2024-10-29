const { Datatypes } = require('sequelize');
const sequelize = require("./config/database");

const User = sequelize.define('User', {

    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

module.exports = User;