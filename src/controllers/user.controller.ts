import HashUtils from "../helpers/hashingpassword"
import UserService from "../dao/user.dao";
import TokenGenerator from "../services/token.services";
import SignupValidator from "./validators/signupvalid"
import SigninValidator from "./validators/signinvalid";
import { Request, Response } from "express";

let signupvalidator = new SignupValidator();
let signinvalidator = new SigninValidator();
let tokengenerate = new TokenGenerator();
let userservice = new UserService();
let hashutils = new HashUtils();


class AuthController {

  public signup=async(req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    const value = signupvalidator.validateSignup(name, email, password);
    if (value === true) {
      const user = await userservice.findByEmail(email);
      if (user.length >= 1) {
        res.send({ msg: "Sorry, user already exists", status: "fail" });
      } else {
        try {
          await userservice.createUser(email, password, name);
          res.send({ msg: "Sign-up successful" });
        } catch (err) {
          console.log(err);
          res.send({ msg: "Something went wrong" });
        }
      }
    } else {
      res.send({ msg: "Details not correctly entered" });
    }
  }

  public signin=async(req: Request, res: Response): Promise<void>=> {
    const { email, password } = req.body;

    let value = signinvalidator.validate(email, password);
    if (value === false) {
      res.send({ msg: "Complete your details", status: "fail" });
      return;
    }

    try {
      const user = await userservice.findByEmail(email);

      if (user.length > 0) {
        const hashed_password = user[0].password;

        const result = await hashutils.checkhashedpassword(password, hashed_password);

        if (result===true) {
          let token = tokengenerate.generate(user[0]._id);
          console.log(token);
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
  }

  public logout = async(req: Request, res: Response): Promise<void>=> {
    res.clearCookie("token");
  }

}


export default AuthController;