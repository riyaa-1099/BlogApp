const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]||req.cookies.token;

  if (token) {
    const decoded = jwt.verify(token, process.env.secretKey);
    // console.log("decoded",decoded)
    if (decoded) {
      const userID = decoded.userId;
      req.body.userID = userID;

      next();
    } else {
      res.send("Please login");
    }
  } else {
    res.send("Please login");
  }
};

module.exports = authentication;
