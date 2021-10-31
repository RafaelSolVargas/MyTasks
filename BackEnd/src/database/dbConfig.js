const env = process.env.NODE_ENV || 'production';
let config = require('../config/databaseEnv')[env]

module.exports = config;
