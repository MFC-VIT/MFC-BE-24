const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = (CONNECTION_STRING)=>{
        mongoose.connect(process.env.CONNECTION_STRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        .then(c=>{
            console.log(`Database Connected:`);
            console.log(`Host: ${c.connection.host}`);
            console.log(`Port: ${c.connection.port}`);
            console.log(`Name: ${c.connection.name}\n`);
            })
        .catch(err=>{
            console.log(err);
            process.exit(1);
        })   
};

module.exports = connectDB;