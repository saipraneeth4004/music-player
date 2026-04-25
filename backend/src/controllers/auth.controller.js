const { default: mongoose } = require("mongoose")
const userModel=require("../models/user.model")  
const jwt=require("jsonwebtoken") 
const bcrypt=require("bcrypt")


async function registerUser(req,res){

    const {username,email,password,role="user"}=req.body 

    const isUserAlreadyExists=await userModel.findOne({  
        $or:[
            {username},
            {email}
        ]
    }) 
    if(isUserAlreadyExists){
        return res.status(400).json({message:"User with this username or email already exists"})
    } 
   const hashedPassword=await bcrypt.hash(password,10)
   const user=await userModel.create({
        username,
        email,
        password:hashedPassword,
        role
   })  
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"}) 
    res.cookie("token",token)
    res.status(201).json({message:"User registered successfully",user,token}) 
} 



async function loginUser(req,res){
    const {username,email,password}=req.body  

    const user=await userModel.findOne({ 
        $or:[
            {username},
            {email}
        ]
    }) 

    if(!user){
        return res.status(401).json({message:"Invalid username or email"})
    } 

   const isPasswordValid=await bcrypt.compare(password,user.password) 
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid password"})
    }
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({message:"User logged in successfully",user,token})    
} 

async function logoutUser(req,res){
    res.clearCookie("token") 
    res.status(200).json({message:"User logged out successfully"}) 
}

module.exports={registerUser,loginUser,logoutUser}


