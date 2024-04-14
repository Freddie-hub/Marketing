const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).send("Welcome to r n j API...");
});

module.exports = router;
