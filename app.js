require("dotenv").config()
const express = require("express")
const connectToDb = require("./database")
const app = express()
connectToDb()

const adminSeeder = require("./adminSeeder")
const userRoute = require("./routes/userRoute")
const bikeRoute = require("./routes/bikeRoute")
const adminRoute = require("./routes/adminRoute")
const providerRoute = require("./routes/providerRoute")
// incoming json data bujna sakne capability dinxa 
app.use(express.json())

app.use("/user",userRoute)
app.use("/bike",bikeRoute)
app.use("/admin",adminRoute)
app.use("/provider",providerRoute)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
    adminSeeder()
    console.log("Server has started at port " + PORT)
})
