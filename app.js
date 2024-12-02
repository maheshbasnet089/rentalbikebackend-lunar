require("dotenv").config()
const express = require("express")
const connectToDb = require("./database")
const { registerUser, loginUser, forgotPassword, resetPassword } = require("./controller/authentication")
const { addBike, getAllBikes, getBike, deleteBike, updateBike } = require("./controller/bike")
const app = express()
connectToDb()
const {multer,storage} = require("./services/multerConfig")
const adminSeeder = require("./adminSeeder")
const checkIsLoggedInOrNot = require("./middleware/checkIsLogInOrNot")
const accessTo = require("./middleware/accessTo")
const { getAllUser, deleteUser } = require("./controller/admin/adminController")
const { becomeAProvider } = require("./controller/provider")
const upload = multer({storage : storage})

// incoming json data bujna sakne capability dinxa 
app.use(express.json())

// authentication api 
app.post("/register", registerUser)
app.post("/login",loginUser)
app.post("/forgot-password", forgotPassword) 
app.post("/reset-password",resetPassword)


//bike api 
app.post("/add-bike",checkIsLoggedInOrNot,accessTo("admin"),upload.single("image"), addBike)
app.get("/get-bikes",getAllBikes)
app.get("/get-bikes/:id",getBike)
app.delete("/delete-bike/:id",deleteBike)
app.patch("/update-bike/:id",updateBike)

// admin api 
app.get("/admin/user",checkIsLoggedInOrNot,accessTo("admin"), getAllUser)
app.delete("/admin/user/:id",checkIsLoggedInOrNot,accessTo("admin"),deleteUser)

// provider api 
app.post("/provider/become",checkIsLoggedInOrNot,accessTo("customer"), becomeAProvider)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
    adminSeeder()
    console.log("Server has started at port " + PORT)
})
