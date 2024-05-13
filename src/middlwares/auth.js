const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test(bearer))
    return res.status(401).json({ error: "Incorrect format" });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token invalid" });
    next();
  });
};
