const express = require("express");
const userController = require("./Controller/user.controller");
const { register, login, newToken } = require("./Controller/auth.controller");
const passport = require("./config/google-oauth");
const cors = require("cors");
const Hotel_controller = require("./Controller/Hotel_controller");
const connect = require("./config/db");

const app = express();
const port = 2234;

app.use(cors());
app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/hotel", Hotel_controller);
app.use("/users", userController);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);

    return res.send({ user, token });
  }
);

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log("port " + port);
  } catch (error) {
    console.log(error);
  }
});
