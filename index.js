const express = require("express");
const app = express();
const routes = require('./src/routes');
const Game = require("./src/models/Game");
const User = require("./src/models/User");

app.use(express.json());
app.use("/", routes);

app.listen(3001);