const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
name:String,
email:String,
password:String,

},{timestamps:true})

const Usermodel=mongoose.model("blogusers",userSchema);

module.exports=Usermodel;