const env = process.env.NODE_ENV || 'development';
const config = require('../config/databaseEnv')[env]

module.exports = config;
