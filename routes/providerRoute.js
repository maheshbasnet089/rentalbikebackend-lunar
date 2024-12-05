const express = require("express")
const { becomeAProvider, changeProviderStatus } = require("../controller/provider")
const checkIsLoggedInOrNot = require("../middleware/checkIsLogInOrNot")
const accessTo = require("../middleware/accessTo")
const router = express.Router()

router.route("/become").post(checkIsLoggedInOrNot,accessTo("customer"), becomeAProvider)
router.route("/change-status").patch(checkIsLoggedInOrNot,accessTo("admin"),changeProviderStatus)
module.exports = router