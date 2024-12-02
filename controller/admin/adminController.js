const User = require("./../../model/userModel")


exports.getAllUser = async(req,res)=>{
    const data = await User.find()
    res.status(200).json({
        message : "User fetched successfully", 
        data : data
    })
}

exports.deleteUser = async(req,res)=>{
    const id = req.params.id 
    await User.findByIdAndDelete(id)
    res.status(200).json({
        message : "User deleted successfully"
    })
}