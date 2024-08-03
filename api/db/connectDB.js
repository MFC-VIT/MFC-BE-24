const mongoose = require("mongoose");
console.log;
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI, {});
    console.log(`Successfully connected to database`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
