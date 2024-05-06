const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
    async store(req, res) {
        // Validate input fields
        await body("name").notEmpty().withMessage("Name is required").run(req);
        await body("email").isEmail().normalizeEmail().withMessage("Invalid email").run(req);
        await body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);

        password = bcrypt.hashSync(password, salt);

        try {
            const user = await User.create({ name, email, password });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async getUser(email) {
        const user = await User.findOne({ where: { email } });
        return user;
    }
};
