const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const User = require("../models/userModel");
require("dotenv").config();

passport.use(
    new GoogleStrategy({
        //options for strategy
        callbackURL: 'http://localhost:3000/api/v1/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }, async (accessToken, refreshToken, profile, done)=>{
        //passport callback function
        // accessToken: token from google
        // check if user already exists in database
        const existingUser = await User.findOne({ 
            googleId: profile.id  
        }) 
        if (existingUser){
            console.log(existingUser);
            return done(null, existingUser);
        }
        else {
            new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                thumbnail: profile.photos[0].value, 
            }).save().then((newUser)=>{
                console.log("new User created: ", newUser);
                return done(null, newUser);
            })
        }
    })
)