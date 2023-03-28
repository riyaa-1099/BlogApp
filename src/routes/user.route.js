const express=require("express")
const validateSignup=require("../controllers/validators/signupvalid")
const {hashingpassword, checkhashedpassword} = require("../helpers/hashingpassword")
const authentication=require("../middlewares/authentication")
const generatetoken=require("../services/token.services")
const Usermodel=require("../models/user.model")
const userRouter=express.Router();


//--------------------------------------------------Signup route 

userRouter.post("/signup",async(req,res)=>{

const {email,password,name}=req.body;

validateSignup(name,email,password)


const user=await Usermodel.find({email})
if(user.length>=1){
    res.send({"msg":"Sorry, user already exist",status:"fail"});  
}
else{
    try{
const hash=hashingpassword(password);
const current=new Usermodel({email,password:hash,name})
const saved=await current.save();
res.send({"msg":"Sign-up successfull"})
}
catch(err){
    console.log(err)
res.send({"msg":"Something went wrong"})
}
}
}
)


//--------------------------------------------------Login route 

userRouter.post("/signin",async(req,res)=>{
const {email,password}=req.body;
if(!email||!password){
    res.send({msg:"Complete your details",status:"fail"});
    return;
}
try{
const user=await Usermodel.find({email})
if(user.length>0){
    const hashed_password=user[0].password;
    const result= checkhashedpassword(password,hashed_password)
     if(result===true){
     let token=generatetoken(res,user[0]._id,user[0].role)  
   
     res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
     res.send({"msg":"Login Successfull","token":token})
     }
     else{
         res.send({"msg":"wrong password"})
     }
    }
}
catch(err){
    console.log(err)
    console.log({"msg":"Something went wrong"})
}
})


//--------------------------------------------------Logout route 
userRouter.post("/logout",authentication,async(req,res)=>{
  
    res.clearCookie('token');

})

module.exports=userRouter
