const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
topic:String,
content:String,
userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blogusers"
},
  createdAt: {
    type: Date,
    default: Date.now
  }


})

const Blogmodel=mongoose.model("blogs",blogSchema);

module.exports=Blogmodel;