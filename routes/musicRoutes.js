const express = require("express")
const router = express.Router()
const musicController = require("../controllers/musicController")

router.get("/explore", musicController.explore)
router.get("/search", musicController.search)
router.get("/popular", musicController.popular)
router.post("/play/:id", musicController.play)
router.get("/add", musicController.addMusicForm)
router.post("/add", musicController.addMusic)
router.post("/api/search", musicController.searchAPI)
router.post("/api/fetch", musicController.fetchFromAPI)
router.get("/library", musicController.library)

module.exports = router
