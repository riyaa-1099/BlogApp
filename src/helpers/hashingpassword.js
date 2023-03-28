const bcrypt=require("bcrypt")
const generatetoken=require("../services/token.services")

const hashingpassword=(password)=>{
bcrypt.hash(password,4,async function(err,hash){
    if(err){
        // console.log(err)
       return false;
    }
    else{
return generatetoken();
    }
})


}

const checkhashedpassword=(password,hashed_password)=>{
    bcrypt.compare(password,hashed_password,async function(err,result){
        if(err){
            // console.log(err)
           return false;
        }
        else{
    if(result){
return true;
    }
    
        }
    })
    
    
    }
module.exports={hashingpassword, checkhashedpassword};