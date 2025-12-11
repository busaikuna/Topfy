const express = require("express");
const router = express.Router();
const playController = require("../controllers/playController");

router.post("/", playController.play);

module.exports = router;