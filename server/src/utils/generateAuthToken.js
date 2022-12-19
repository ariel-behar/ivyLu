const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = (user) => {
    let payload = user;

    let AUTH_TOKEN = jwt.sign(payload, process.env.AUTH_TOKEN_SECRET);

    return AUTH_TOKEN;
}

module.exports = generateAuthToken; 