const mongoose = require("mongoose");
const log = require('../utils/logger').default
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI);
    log.info(`Successfully connected to database`);
  } catch (error) {
    log.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
