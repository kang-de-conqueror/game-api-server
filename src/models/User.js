const Sequelize = require("sequelize");
const Connection = require("../database");

const User = Connection.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      isLowercase: true,
      max: 40,
    },
  },
  name: {
    type: Sequelize.STRING(40),
    allowNull: false,
    validate: {
      isLowercase: true,
      max: 40,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal(
      "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    ),
  },
});

module.exports = User;
