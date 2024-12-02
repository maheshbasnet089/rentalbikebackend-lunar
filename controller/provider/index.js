const Provider = require("../../model/providerModel")



exports.becomeAProvider = async(req,res)=>{
   try {
    const {name,contactNo,email,vatNo,panNo,location} = req.body 
    const customerId = req.user._id
    if(!name || !contactNo || !email|| !location){
        return res.status(400).json({
            message : "Please provide name,contactNo,location,email"
        })
    }
    await Provider.create({
        name,
        contactNo, 
        email,
        vatNo, 
        panNo,
        location, 
        customerId : customerId
    })
    res.status(200).json({
        message : "Your form has been submited, please wait for admin response"
    })
   } catch (error) {
    res.status(500).json({
        message : error.message
    })
   }
}