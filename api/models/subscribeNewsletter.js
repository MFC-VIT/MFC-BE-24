const mongoose = require("mongoose");

const subscribeNewsletter = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        default:Date.now()
    }
})

const subscribeNewsletterSchema = mongoose.model('subscribeNewsLetter',subscribeNewsletter)
module.exports = subscribeNewsletterSchema;