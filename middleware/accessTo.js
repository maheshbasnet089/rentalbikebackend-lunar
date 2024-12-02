
const accessTo = (role)=>{
return (req,res,next)=>{
    const incomingUserRole = req.user.role
    if(incomingUserRole !== role){
    res.status(403).json({
        message : "You dont have access to do it !!"
    })
    }else{
    next()
    }
}
}

module.exports = accessTo