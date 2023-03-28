const express=require("express")
const blogRouter=express.Router();

const authorise=require("../middleware/authorization")
const Blogmodel=require("../models/blog.model")


//--------------------------------------------------Getting all blogs

blogRouter.get("/",async(req,res)=>{
    const Blogs=await Blogmodel.find()
    res.send({"All Blogs":Blogs,status:"success"})
})


blogRouter.post("/post",authorise(['writer']),async(req,res)=>{
const payload=req.body;
try{
    const new_blog=new Blogmodel(payload);
    await new_blog.save();
    res.send({"msg":"Blog Created successfully"})
}
catch(err){
    console.log(err)
    res.send({"msg":"something wrong!!"})
}
})



//--------------------------------------------------updating route 

blogRouter.patch("/patch/:blogID",authorise(['writer']),async(req,res)=>{
const blogID=req.params.blogID;
const payload=req.body;
const userID=req.body.userID;

const blogm=await Blogmodel.findOne({_id:blogID})
//console.log(blogm)
if(userID!==blogm.userID){
    res.send({"msg":"Not authorised!!"}) 
}
else{

    await Blogmodel.findByIdAndUpdate({_id:blogID},payload)
    res.send({"msg":"Blog updated successfully!!"}) 
}
})


//--------------------------------------------------Deleting route 

blogRouter.delete("/delete/:blogID", authorise(["writer"]),async(req,res)=>{
    const blogID=req.params.blogID;
    const userID=req.body.userID;
    const blog=await Blogmodel.findOne({_id:blogID})
try{
if(userID==blog.userID){
      await Blogmodel.findByIdAndDelete({_id:blogID})
    res.send({"msg":"Blog deleted successfully!!",status:"success"}) 
}
else if(userID!==blog.userID){
    res.send({"msg":"Not authorised!!",status:"fail"}) 
}
}
catch(err){
    res.send({ msg: "error while deleting try again", status: "error" });
}
})

module.exports=blogRouter;
