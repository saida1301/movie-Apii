const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
};