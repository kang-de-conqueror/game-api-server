const Sequelize = require("sequelize");
const Connection = require("../database");

const User = Connection.define("users", {
    email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, 
            isLowercase: true,
            max: 40,
        }
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
            isLowercase: true,
            max: 40,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,        
    }
});

module.exports = User;