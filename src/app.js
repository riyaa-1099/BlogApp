const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: '*' }));
const  authentication  = require("./middlewares/authentication");
const connection = require("./config/db");
const  userRouter  = require("./routes/user.route");
const  blogRouter  = require("./routes/blog.route");


app.get("/", (req, res) => {
  res.send({ msg: "Welcome" });
});


app.use("/user", userRouter);

app.use(authentication);

app.use("/blog", blogRouter);




app.listen(7000, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
    console.log("Listening on port 7000");
  } catch (err) {
    console.log(err);
    console.log("Connection failed to db");
  }
});