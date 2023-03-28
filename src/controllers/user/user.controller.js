const { checkhashedpassword } = require("../helpers/hashingpassword");
const { findByEmail, createUser } = require("../dao/user.dao");
const generateToken = require("../services/token.service");
const validateSignup = require("../validators/signupvalid");
const validateSignin = require("../validators/signinvalid");

module.exports = {
  signup: async function (req, res) {
    const { email, password, name } = req.body;

    let value = validateSignup(name, email, password);
    if (value === true) {
      const user = await findByEmail(email);
      if (user.length >= 1) {
        res.send({ msg: "Sorry, user already exists", status: "fail" });
      } else {
        try {
          await createUser(email, password, name);
          res.send({ msg: "Sign-up successful" });
        } catch (err) {
          console.log(err);
          res.send({ msg: "Something went wrong" });
        }
      }
    }
  },

  signin: async function (req, res) {
    const { email, password } = req.body;

    let value = validateSignin(email, password);
    if (value === false) {
      res.send({ msg: "Complete your details", status: "fail" });
      return;
    }

    try {
      const user = await findByEmail(email);
      if (user.length > 0) {
        const hashed_password = user[0].password;
        const result = checkhashedpassword(password, hashed_password);

        if (result === true) {
          let token = generateToken(user[0]._id, user[0].role);

          res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
          res.send({ msg: "Login successful", token: token });
        } else {
          res.send({ msg: "Wrong password" });
        }
      }
    } catch (err) {
      console.log(err);
      console.log({ msg: "Something went wrong" });
    }
  },

  logout: async function (req, res) {
    res.clearCookie("token");
  },
};
