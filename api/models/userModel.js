const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        //RFC 5322 https://emailregex.com/
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address.'],
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    thumbnail: {
        type: String,
    },
    googleId: {
        type: String,
    }
});

module.exports = mongoose.model("user",userSchema);