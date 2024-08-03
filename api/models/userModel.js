const mongoose = require("mongoose");
const { z } = require("zod");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: [true, "Email already exist"],
    //RFC 5322 https://emailregex.com/
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email address.",
    ],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  thumbnail: {
    type: String,
  },
  image: {
    type: String,
    required: [false, "Add the user password"],
  },
  googleId: {
    type: String,
    required: [true, "Add the googleId"],
  },
});
const userValidationSchema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
});

module.exports = mongoose.model("user", userSchema);
