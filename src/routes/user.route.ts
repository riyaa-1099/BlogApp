import express from "express";
const userRouter = express.Router();

import AuthenticationMiddleware from "../middlewares/authentication";
import AuthController from "../controllers/user.controller";

let auth = new AuthenticationMiddleware();
let authsign = new AuthController();

userRouter.post("/signup", authsign.signup);
userRouter.post("/signin", authsign.signin);
userRouter.post("/logout", auth.authentication, authsign.logout);

export default userRouter;
