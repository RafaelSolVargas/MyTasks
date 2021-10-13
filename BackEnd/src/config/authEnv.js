/* Carrega o .env na raiz do projeto */
require('dotenv').config();

module.exports = {
    appSecret: process.env.AUTH_SECRET,
    expiresTime: process.env.AUTH_EXPIRES_IN,
    salts: process.env.CRYPTO_SALT_TIMES,
};
