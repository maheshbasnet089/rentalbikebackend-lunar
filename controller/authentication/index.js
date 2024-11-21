const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")


exports.registerUser = async (req,res)=>{
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400).json({
            message : "Please provide username,email,password"
        })
       return  
    }
  
   await User.create({
        username, 
        email, 
        password : bcrypt.hashSync(password,12) 
    })
    res.status(201).json({
        message : "User registered successfully"
    })
}

exports.loginUser = async (req,res)=>{
    const {email,password}= req.body  // manish@gmail.com
    if(!email || !password){
        res.status(400).json({
            message : "Please provide email and password"
        })
        return
    }
    // check email 
   const data = await User.find({email : email}) // select * from users where email = "manish@gmail.com"
   /*
    user with that email vetena vane --> [] aauxa 
    vetyo vane chai - [{username:"manish",email:"manish@gmail.com",password:"manish"}]
   */
}


