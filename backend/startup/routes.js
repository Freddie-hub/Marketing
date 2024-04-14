const express = require("express");

const users = require("../routes/users");
const welcome = require("../routes/welcome");
const auth = require("../routes/auth");

const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());

  app.use("/api/users", users);
  app.use("/", welcome);
  app.use("/api/auth", auth);

  app.use(error);
};
