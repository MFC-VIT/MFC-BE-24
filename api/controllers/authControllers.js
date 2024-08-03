const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("../models/userModel");
const jwt = require("jsonwebtoken");

const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;
const jwtSecret = process.env.JWT_SECRET;

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("GOOGLE PROFILE:", profile);
      try {
        if (
          profile.emails &&
          profile.emails.length > 0 &&
          profile.emails[0].value.endsWith("@gmail.com")
        ) {
          let user = await userdb.findOne({ googleId: profile.id });

          if (!user) {
            user = new userdb({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              isAdmin: false,
            });

            await user.save();
          }
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid email domain" });
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = {
  authenticateGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  googleCallback: passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "http://localhost:5173/login",
  }),
  successLogin: async (req, res) => {
    console.log("req", req.user);
    if (req.user) {
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email, isAdmin: req.user.isAdmin },
        jwtSecret,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "Login successful", user: req.user, token });
    } else {
      res.status(401).json({ message: "User not authenticated" });
    }
  },
  successLogout: async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:5173/login");
    });
  },
};
