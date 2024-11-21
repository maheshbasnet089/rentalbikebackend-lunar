require("dotenv").config()
const express = require("express")
const connectToDb = require("./database")
const { registerUser, loginUser } = require("./controller/authentication")
const app = express()
connectToDb()

// incoming json data bujna sakne capability dinxa 
app.use(express.json())

// register api 
app.post("/register",registerUser)
app.post("/login",loginUser)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log("Server has started at port " + PORT)
})
