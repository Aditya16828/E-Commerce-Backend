const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SALT_ROUNDS: process.env.SALT_ROUNDS
};