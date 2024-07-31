/**
 * { id, username / (firstName and lastName), emailId, password..etc }
 * (Input validation for every property (can try zod!!!))
 */
const mongoose = require('mongoose');
const {z} = require('zod');

const userSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        auto:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        }
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