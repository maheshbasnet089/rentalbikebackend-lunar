const User = require("../../model/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendMail = require("../../services/sendMail")
const generateOtp = require("../../services/generateOtp")


exports.registerUser = async (req,res)=>{
   try{
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
   }catch(e){
    res.status(500).json({
        message : "ERror", 
        errorMessage : e.message
    })
   }
}

exports.loginUser = async (req,res)=>{
    try {
        const {email,password}= req.body  // manish@gmail.com
    if(!email || !password){
        res.status(400).json({
            message : "Please provide email and password"
        })
        return
    }
    // check email 
   const data = await User.find({email : email}) // select * from users where email = email
   /*
    user with that email vetena vane --> [] aauxa 
    vetyo vane chai - data --> [{_id : "123213", username:"manish",email:"manish@gmail.com",password:"$dfdsfjlds"}]
['Manish']
   */
    if(data.length === 0){
        res.status(404).json({
            message : "No user with that email"
        })
    }else{
        // password check 
        const isPasswordMatched = bcrypt.compareSync(password,data[0].password) // returns boolean
        if(isPasswordMatched){
            var token = jwt.sign({id : data[0]._id },process.env.JWT_SECRET_KEY,{
                expiresIn : process.env.JWT_EXPIRES_IN
            })
            res.status(200).json({
                message : "Logged in successfully", 
                token
            })
        }else{
            res.status(404).json({
                message : "Invalid password"
            })
        }
    }
    } catch (error) {
        res.status(500).json({
            message : "ERror", 
            errMessage : error.message
        })
    }
}

exports.forgotPassword = async(req,res)=>{
   try {
    const {email} = req.body 
    let data = await User.find({email : email})
    if(data.length === 0 ){
        return res.status(404).json({
            message : "No user registered with that email"
        })
    }
    if(!email){
        res.status(400).json({
            message : "Please provide email"
        })
        return
    }
    var otp = generateOtp()
    data[0].otp = otp 
    await data[0].save()
    await sendMail(email,otp)
    res.status(200).json({
        message : "OTP sent successfully"
    })
   } catch (error) {
    res.status(500).json({
        message : "error", 
        errorMessage : error.message
    })
   }
}

exports.resetPassword = async (req,res)=>{
   try {
    const {otp,newPassword} = req.body
    if(!otp || !newPassword){
        return  res.status(400).json({
            message : "Please provide otp, newPassword"
        })
    }
    // otp verify , whether yo otp xa ki xainw
    
    const [data] = await User.find({otp : otp})
    if(!data){
        return res.status(404).json({
            message : "Invalid OTP"
        })
    }
    data.password = bcrypt.hashSync(newPassword,10)
    await data.save()
    res.status(200).json({
        message : "Password reset successfully"
    })
   } catch (error) {
    res.json(500).json({
        message : "Error", 
        errorMessage : error.message
    })
   }
}