const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        res.status(401).json({ error: "No token provided" });

    const parts = authHeader.split(" ");

    if (parts.length !== 2)
        res.status(401).json({ error: "token error" });

    const [bearer, token] = parts;

    if (!/^Bearer$/i.test(bearer))
        res.status(401).json({ error: "incorrect format" });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "token invalid" });
        next();
    });

}