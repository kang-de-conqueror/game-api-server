const { body, validationResult } = require("express-validator");
const gameService = require("../services/GameService");

module.exports = {
  async store(req, res) {
    // Validate input fields
    await body("name").notEmpty().withMessage("Name is required").run(req);
    await body("description").notEmpty().withMessage("Description is required").run(req);
    // Add more validation rules as needed

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const game = await gameService.createGame(req.body);
      res.status(201).json(game);
    } catch (err) {
      res.status(400).json(err.message);
    }
  },

  async update(req, res) {
    // Validate input fields
    await body("name").notEmpty().withMessage("Name is required").run(req);
    await body("description").notEmpty().withMessage("Description is required").run(req);
    // Add more validation rules as needed

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (isNaN(req.params.id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const id = parseInt(req.params.id);

    try {
      const game = await gameService.updateGame(id, req.body);
      res.status(200).json(game);
    } catch (err) {
      if (err.message === "Resource not found") {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.status(400).json(err.message);
    }
  },

  async index(req, res) {
    try {
      const games = await gameService.getAllGames();
      res.status(200).json(games);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async single(req, res) {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const id = parseInt(req.params.id);

    try {
      const game = await gameService.getGameById(id);
      res.status(200).json(game);
    } catch (err) {
      if (err.message === "Resource not found") {
        return res.status(404).json({ error: "Resource not found" });
      }
      res.status(500).json(err.message);
    }
  },

  async delete(req, res) {
    if (isNaN(req.params.id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const id = parseInt(req.params.id);

    try {
      await gameService.deleteGame(id);
      res.status(200).json({ message: "Ok" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
};
