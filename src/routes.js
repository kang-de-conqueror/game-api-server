// routes.js
const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const GameController = require("./controllers/GameController");
const authMiddleware = require("./middlewares/authMiddleware");

// Apply auth middleware to all routes except user registration and authentication

// User routes
router.post("/register", UserController.store);
router.post("/login", UserController.authentication);

router.use(authMiddleware);

// Game routes
router.post("/games", GameController.store);
router.get("/games", GameController.index);
router.get("/games/:id", GameController.single);
router.put("/games/:id", GameController.update);
router.delete("/games/:id", GameController.delete);

module.exports = router;
