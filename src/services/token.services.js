const jwt=require("jsonwebtoken")

function generatetoken(res,userId,role){

    let token = jwt.sign({ userId, role }, process.env.secretKey, {
      expiresIn: "1d",
    });
  
    return  token ;
  
      }

module.exports=generatetoken;
