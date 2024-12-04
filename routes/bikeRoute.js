
const express = require("express")
const checkIsLoggedInOrNot = require("../middleware/checkIsLogInOrNot")
const accessTo = require("../middleware/accessTo")
const { addBike, getAllBikes, getBike, deleteBike, updateBike } = require("../controller/bike")
const router = express.Router()

const {multer,storage} = require("./../services/multerConfig")
const upload = multer({storage : storage})

router.route("/add-bike").post(checkIsLoggedInOrNot,accessTo("admin"),upload.single("image"), addBike)

router.route("/get-bikes").get(getAllBikes)
router.route("/get-bikes/:id").get(getBike)
router.route("/delete-bike/:id").delete(deleteBike)
router.route("/udpate-bike/:id").patch(updateBike)

module.exports = router