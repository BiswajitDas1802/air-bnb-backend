require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4: uuidv4 } = require("uuid");

const User = require("../Models/User.model");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "418850283877-698jmjheu6hak5cck021b4sg47pfoht9.apps.googleusercontent.com",
      clientSecret: "AIzaSyA4quQqpDEGVfyWdQDyjcqfvKeUyxiJvD0",
      callbackURL: "http://localhost:2345/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?.email }).lean().exec();

      if (!user) {
        user = await User.create({
          email: profile?.email,
          password: uuidv4(),
          role: ["customer"],
        });
      }

      return done(null, user);
    }
  )
);

module.exports = passport;
