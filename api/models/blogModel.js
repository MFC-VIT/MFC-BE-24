/**
 * { id, title, body, authorName, authoredDate }
*/
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        auto:true,
    },
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
    autheredDate:{
        tyep:Date,
        required:true,
        default:Date.now()
    }
});

module.exports = mongoose.model('Blog', blogSchema);