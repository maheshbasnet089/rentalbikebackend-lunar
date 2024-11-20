require("dotenv").config()
const express = require("express")
const connectToDb = require("./database")
const app = express()
connectToDb()



const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log("Server has started at port " + PORT)
})
