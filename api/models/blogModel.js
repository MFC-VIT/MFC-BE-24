/**
 * { id, title, body, authorName, authoredDate }
*/
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    authoredDate:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

module.exports = mongoose.model('Blog', blogSchema);