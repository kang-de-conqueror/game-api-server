const User = require("../models/User");
const UserController = require("./UserController");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(params){
    return jwt.sign({ params }, process.env.SECRET, { expiresIn: "48h"  });
}

module.exports = {
    async authentication(req, res) {

        const { password, email } = req.body;

        const user = await UserController.getUser(email);
        if (user === null) {
            res.status(404).json("user not found");
        } else {
            const verify = bcrypt.compareSync(password, user.password);
            if (verify) {
                user.password = undefined;
                res.status(200).json({user, token: generateToken(user.id)});
            } else {
                res.status(401).json("não autenticado");
            }

        }
    }
}