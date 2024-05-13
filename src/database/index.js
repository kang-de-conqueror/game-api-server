require("dotenv").config();

const Sequelize = require("Sequelize");
const database = process.env.DB_NAME;
const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const  Connection = new Sequelize(database, db_user, db_password, {
    host: "localhost",
    dialect: "mysql"
})

module.exports = Connection;