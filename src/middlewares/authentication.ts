import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

class AuthenticationMiddleware {

  public authentication = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (token) {
      try {
        const secretKey = process.env.SECRETKEY;
        if (!secretKey) {
          throw new Error("Missing secret key");
        }

        const decoded: JwtPayload | string = jwt.verify(token, secretKey);
        const userID = typeof decoded !== 'string' && decoded.userID ? decoded.userID : null;
        req.body.userID = userID;
        
        next();
      } catch (error) {
        res.status(401).send("Invalid token");
      }
    } else {
      res.status(401).send("No token provided");
    }
  }
}

export default AuthenticationMiddleware;