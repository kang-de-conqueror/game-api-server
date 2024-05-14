// app.js
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const routes = require("./src/routes");
const bodyParser = require("body-parser");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter);

// Apply CORS middleware
app.use(cors());

// Other middleware and configurations
app.use(bodyParser.json({ type: "application/json" }));

// Apply routes
app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
