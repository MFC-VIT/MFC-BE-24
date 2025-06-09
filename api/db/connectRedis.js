const valkey = require('ioredis');
const log = require('../utils/logger').default;
require('dotenv').config();

const client = new valkey(
    process.env.VALKEY_URL || process.env.REDIS_URL,
);

const connectValkey = async () => {
    try {
        log.info('Connected to Valkey');
    } catch (err) {
        console.error('Valkey connection error:', err);
    }
};

module.exports = {
    client,
    connectValkey,
};
