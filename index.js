// app.js
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const routes = require("./src/routes");

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

// Apply routes
app.use("/", routes);

module.exports = app;
