
const express = require("express")
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controller/authentication")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)


module.exports = router