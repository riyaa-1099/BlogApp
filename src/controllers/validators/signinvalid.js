function validateSignin(name,email,password){
if(!email||!password){
   return false;
}
return true
}

  module.exports=validateSignin;