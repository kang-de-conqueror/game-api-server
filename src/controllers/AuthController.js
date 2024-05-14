const { body, validationResult } = require("express-validator");
const authService = require("../services/AuthService");

module.exports = {
  async authenticate(req, res) {
    // Validate email and password inputs
    await body("email").isEmail().normalizeEmail().run(req);
    await body("password").isLength({ min: 6 }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const { user, token } = await authService.authenticateUser(
        email,
        password
      );
      return res.status(200).json({ user, token });
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json("User not found");
      }
      if (error.message === "Unauthorized") {
        return res.status(401).json("Unauthorized");
      }
      return res.status(500).json("Internal Server Error");
    }
  },
};
