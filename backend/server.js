const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const UserRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");

const app = express();
const mongoURL =
  "mongodb+srv://moeyanhtun:test1234@mern-cluster.tr4jm.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster";
mongoose.connect(mongoURL).then(() => {
  console.log("Connectiion Successful");
  app.listen(4000, () => {
    console.log("Hello World");
  });
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/user", UserRouter);

app.get("/set-cookie", (req, res) => {
  res.cookie("name", "Moe Yan Htun");
  res.cookie("immportant-key", "value", { httpOnly: true });
  return res.send("Cookie set Successful");
});

app.get("/get-cookie", (req, res) => {
  let cookie = req.cookies;
  return res.json(cookie);
});
