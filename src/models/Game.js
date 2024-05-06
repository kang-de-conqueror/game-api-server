const { Sequelize, DataTypes } = require("sequelize");
const Connection = require("../database");

const Game = Connection.define("games", {
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: true,
            notNull: true,
            notEmpty: true,
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isInt: true,
            notNull: true,
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isInt: true,
            notNull: true,
            notEmpty: true,
        }
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Game;