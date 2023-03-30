import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class TokenGenerator {
  private readonly secretKey: string | undefined = process.env.SECRETKEY;

  public generate = (userID: string): string => {
    if (!this.secretKey) {
      throw new Error("Secret key is not defined.");
    }
    const token = jwt.sign({ userID }, this.secretKey, {
      expiresIn: "1d",
    });
    return token;
  };
}

export default TokenGenerator;