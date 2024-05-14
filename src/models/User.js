const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
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
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

module.exports = User;
