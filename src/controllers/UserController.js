const User = require("../models/User");
const bcrypt = require("bcryptjs");
module.exports = {
    async store(req, res) {
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
     async getUser(email){
        const user = await User.findOne({ where:  { email } });
        return user;
    }
}