const express = require("express");
const authentication = require("../middlewares/authentication");
const userRouter = express.Router();
const { signup, signin, logout } = require("../controllers/user/user.controller")

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/logout", authentication, logout);

module.exports = userRouter;
