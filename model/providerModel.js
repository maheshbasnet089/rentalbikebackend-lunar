

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const providerSchema = new Schema({
    name : {
        type : String, 
        required : [true, "A provider/shop name must be provided"]
    }, 
    contactNo : {
        type : String, 
        required : [true,"Contact no must be provided"], 
        minLength : 10,
        maxLength : 10 
    }, 
    email : {
        type : String, 
        required : true
    }, 
    vatNo:{
        type : String, 
    }, 
    panNo : {
        type:String
    }, 
    location : {
        type :String, 
        required : [true,"A location must be provided"]
    }, 
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }, 
    status : {
        type : String, 
        enum : ['active','inactive','pending'],
        default : 'pending'
    }
})

const Provider = mongoose.model("Provider",providerSchema)
module.exports = Provider