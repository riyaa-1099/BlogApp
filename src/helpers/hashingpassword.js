const bcrypt = require("bcrypt");
const generatetoken = require("../services/token.services");

const hashingpassword = async (password) => {
 return bcrypt.hash(password, 4).then((hash, err) => {
  if (err) {
    console.log(err)
    return false;
  } else {
    // console.log(">>>>>>>>>>>>. Inside function >>>>>>>>>>>>>.",hash)
    return hash;
  }
})
};

const checkhashedpassword = async (password, hashed_password) => {
  try {
    const result = await bcrypt.compare(password, hashed_password);
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { hashingpassword, checkhashedpassword }