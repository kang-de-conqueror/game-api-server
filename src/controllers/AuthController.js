const { body, validationResult } = require("express-validator");
const UserController = require("./UserController");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(params) {
    return jwt.sign({ params }, process.env.SECRET, { expiresIn: "2880m" });
}

module.exports = {
    async authentication(req, res) {
        // Validate email and password inputs
        await body("email").isEmail().normalizeEmail().run(req);
        await body("password").isLength({ min: 6 }).run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { password, email } = req.body;

        const user = await UserController.getUser(email);
        if (user === null) {
            res.status(404).json("User not found");
        } else {
            const verify = bcrypt.compareSync(password, user.password);
            if (verify) {
                user.password = undefined;
                res.status(200).json({ user, token: generateToken(user.id) });
            } else {
                res.status(401).json("Unauthorized");
            }
        }
    }
}
