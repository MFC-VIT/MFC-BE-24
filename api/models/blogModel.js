const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Users",
    //     required: true,
    // },
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
        type: Date,
        
        default: Date.now()
    },
    imgLink: {
        type: String,
        trim: true,
    },
    mediumLink: {
        type: String,
        trim: true,
    }
});

module.exports = mongoose.model('Blog', blogSchema);