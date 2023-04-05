import express, { Request, Response } from "express";
import cors from "cors";
import AuthenticationMiddleware from "./src/middlewares/authentication";
import connection from "./src/config/db";
import userRouter from "./src/routes/user.route";
import blogRouter from "./src/routes/blog.route";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());


let auth = new AuthenticationMiddleware();

app.get("/", (req: Request, res: Response) => {
  res.send({ msg: "Welcome" });
});

app.use("/user", userRouter);

app.use(auth.authentication);

app.use("/blog", blogRouter);

const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
    console.log(`Listening on port ${PORT}`);
  } catch (err) {
    console.log(err);
    console.log("Connection failed to db");
  }
});