const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    
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
    authoredDate:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

module.exports = mongoose.model('Blog', blogSchema);