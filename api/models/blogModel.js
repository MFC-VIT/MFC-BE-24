const mongoose = require('mongoose');
//first download moment to use this "npm install moment"
const moment = require('moment');
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
        type: String,
        validate:{
            validator: function(v){
                return moment(v,'DD/MM/YYYY',true).isValid();
            }
        }
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