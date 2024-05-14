const { body, validationResult } = require("express-validator");
const userService = require("../services/UserService");

module.exports = {
  async store(req, res) {
    await body("email").isEmail().normalizeEmail().run(req);
    await body("name").notEmpty().withMessage("Name is required").run(req);
    await body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await userService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getUser(req, res) {
    const { email } = req.params;
    try {
      const user = await userService.getUser(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
