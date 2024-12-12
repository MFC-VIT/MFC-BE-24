const mongoose = require('mongoose')

const newsLetterSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    pdf_link:{
        type:String,
        required:true
    },
    cover_url:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }
})

const newsletter = mongoose.model('newsletter',newsLetterSchema)
module.exports = newsletter;