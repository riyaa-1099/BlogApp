const jwt = require("jsonwebtoken");
require("dotenv").config();

function generatetoken(userId) {
  let token = jwt.sign({ userId }, process.env.secretKey, {
    expiresIn: "1d",
  });

  return token;
}

module.exports = generatetoken;
