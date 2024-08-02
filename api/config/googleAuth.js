const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const User = require("../models/userModel");
require("dotenv").config();

passport.use(
    new GoogleStrategy({
        //options for strategy
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }, async (accessToken, refreshToken, profile, done)=>{
        //passport callback function
        // accessToken: token from google
        // check if user already exists in database
        console.log(profile);
        const existingUser = await User.findOne({ 
            googleId: profile.id  
        }) 
        try {

            if (existingUser){
                return done(null, existingUser);
            }
            else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    thumbnail: profile.photos[0].value, 
                }).save().then((newUser)=>{
                    return done(null, newUser);
                })
            }
        } catch(error){
            return done(error, null);
        }
    })
)