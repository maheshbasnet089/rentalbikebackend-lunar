const express = require("express")
const checkIsLoggedInOrNot = require("../middleware/checkIsLogInOrNot")
const accessTo = require("../middleware/accessTo")
const { getAllUser, deleteUser } = require("../controller/admin/adminController")
const router = express.Router()

router.route("/user").get(checkIsLoggedInOrNot,accessTo("admin",getAllUser))
router.route("/user/:id").delete(checkIsLoggedInOrNot,accessTo("admin"),deleteUser)

module.exports = router