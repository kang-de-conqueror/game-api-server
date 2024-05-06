const Sequelize = require("Sequelize");
const  Connection = new Sequelize("crud_games", "root", "root", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = Connection;