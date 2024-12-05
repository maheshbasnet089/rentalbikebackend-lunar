const express = require("express")
const checkIsLoggedInOrNot = require("../middleware/checkIsLogInOrNot")
const accessTo = require("../middleware/accessTo")
const { getAllUser, deleteUser, getAllProvidersList } = require("../controller/admin/adminController")
const router = express.Router()

router.route("/user").get(checkIsLoggedInOrNot,accessTo("admin",getAllUser))
router.route("/user/:id").delete(checkIsLoggedInOrNot,accessTo("admin"),deleteUser)
router.route("/providers").get(checkIsLoggedInOrNot,accessTo("admin"),getAllProvidersList)

module.exports = router