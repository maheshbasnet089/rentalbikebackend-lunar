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

exports.changeProviderStatus = async(req,res)=>{
    const {status,providerId} = req.body 
    const userId = req.user._id
    if(status == "active"){
       await Provider.findByIdAndUpdate(providerId,{status : "active"})
       // code for changing user role 
       await User.findByIdAndUpdate(userId,{role : "provider"})
       res.status(200).json({
        message : "Provider is active now"
       })
    }else if(status == "inactive"){
        await Provider.findByIdAndUpdate(providerId,{status : "inactive"})
        res.status(200).json({
         message : "Provider is active now"
        })
    }else{
        res.status(400).json({
            message : "Invalid status"
        })
    }
}