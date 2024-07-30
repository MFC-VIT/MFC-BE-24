const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    body:{
        type: String,
        required: true,
        trim: true,
    },
    authorName:{
        type: String,
        required: true
    },
    autheredDate:{
        tyep: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Blog', blogSchema);