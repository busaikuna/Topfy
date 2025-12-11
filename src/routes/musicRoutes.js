const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");

router.post("/", musicController.addMusic);

module.exports = router;