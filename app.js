require("dotenv").config()
const express = require("express")
const connectToDb = require("./database")
const { registerUser, loginUser, forgotPassword, resetPassword } = require("./controller/authentication")
const { addBike } = require("./controller/bike")
const app = express()
connectToDb()

// incoming json data bujna sakne capability dinxa 
app.use(express.json())

// authentication api 
app.post("/register",registerUser)
app.post("/login",loginUser)
app.post("/forgot-password",forgotPassword) 
app.post("/reset-password",resetPassword)

//bike api 
app.post("/add-bike",addBike)


const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log("Server has started at port " + PORT)
})
