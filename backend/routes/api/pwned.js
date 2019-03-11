const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the pwned test route" })
);

module.exports = router;