const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    SECRET_KEY: process.env.SECRET_KEY,
    KEY_ID: process.env.KEY_ID,
    KEY_SECRET: process.env.KEY_SECRET
};