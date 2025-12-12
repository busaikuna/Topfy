const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/login", userController.loginForm)
router.post("/login", userController.login)
router.get("/logout", userController.logout)
router.get("/dashboard", userController.dashboard)
router.get("/preferences", userController.preferences)
router.post("/preferences/add", userController.addPreference)
router.post("/preferences/remove", userController.removePreference)
router.get("/history", userController.history)

module.exports = router
