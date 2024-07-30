const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mfc_portal', {
           
        });
        console.log(`Successfully connected to database`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;
