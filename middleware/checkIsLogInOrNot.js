const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const checkIsLoggedInOrNot = (req,res,next)=>{
    console.log(req)
    const token = req.headers.authorization
    console.log(token)
    if(!token){
        return res.status(403).json({
            message : "Please provide token"
        })
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,async (err,result)=>{
        if(err){
            res.status(403).json({
                message : err
            })
        }else{
            console.log(result)
            // check whether result ko id ko user xa ki nai 
           const data = await User.findById(result.id)
           if(!data){
            return res.status(404).json({
                message : "No user with that id"
            })
           }else {
            req.user = data  
            next()
           }
        }
    })
}

module.exports = checkIsLoggedInOrNot

