const mongoose = require("mongoose");
const connectDB = (connection_string)=>{
    return mongoose
        .connect(connection_string)
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