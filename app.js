require("dotenv").config()
const express = require("express")
const connectToDb = require("./database")
const { registerUser, loginUser, forgotPassword, resetPassword } = require("./controller/authentication")
const app = express()
connectToDb()

// incoming json data bujna sakne capability dinxa 
app.use(express.json())

// register api 
app.post("/register",registerUser)
app.post("/login",loginUser)
app.post("/forgot-password",forgotPassword)
app.post("/reset-password",resetPassword)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log("Server has started at port " + PORT)
})
