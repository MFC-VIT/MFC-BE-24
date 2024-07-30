const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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

/* Hashing password for protection against potential attacks using hashing
and Salting is done to prevent hash generate from same passwords from being same */
userSchema.methods.createHash = async function (plainTextPassword){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

/* Compares and validate password entered (candidates password) and password stored (this.password) */ 
userSchema.methods.validatePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * @example
 * * Signup
    const createdUser = new Users(requestBody);
    const hashedPassword = await createdUser.createHash(request.password); // (returns the hashed password) 
    createdUser.password = hashedPassword;
    await createdUser.save();
 * * Login
    const validatedPassword = await user.validatePassword(request.password);  // (returns boolean (true or false))
 */

module.exports = mongoose.model("user",userSchema);