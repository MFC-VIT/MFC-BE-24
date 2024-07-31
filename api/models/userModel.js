const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const{z} = require('zod');
const userSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        auto:true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
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
    password:{
        type: String,
        required: true,
        trim: true,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
});
const userValidationSchema = z.object({
    username: z.string().min(3).max(30),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string()
});

module.exports = mongoose.model("User",userSchema);