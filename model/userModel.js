const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String, 
        required : true // compulsory halnai paryo 
    }, 
    email : {
        type : String, 
        required : true, 
        unique : true 
    }, 
    password : {
        type : String , 
        required : true
    }, 
    otp : {
        type : Number
    }, 
    role : {
        type : String, 
            enum : ['admin','provider','customer'],
            default : 'customer'
    }
})

const User = mongoose.model("User",userSchema) // table banako User vanne ani column(userSchema) sanga connect gareko 
module.exports = User