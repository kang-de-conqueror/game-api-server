const express = require("express");
const routes = express.Router();
const GameController = require("./controllers/GameController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const auth = require("../src/middlwares/auth");
routes.post("/game", auth, GameController.store);
routes.get("/games", GameController.index)
routes.get("/game/:id", GameController.single);
routes.put("/game/:id", auth, GameController.update);
routes.delete("/game/:id", auth, GameController.delete);

routes.post("/user", auth, UserController.store);
routes.post("/authenticate", AuthController.authentication);
module.exports = routes;