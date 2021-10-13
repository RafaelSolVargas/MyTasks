/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../database/dbConfig');

const db = {};

/* Cria a conexão */
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/* Passa por todos os arquivos dessa pasta e importa o Model, executando e guardando no obj db */
fs
    .readdirSync(__dirname)
    .filter(
        (file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'),
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

/* Chama a associação de cada Model */
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

/* Guarda a conexão e a configuração da conexão no objeto */
db.sequelize = sequelize;
db.config = config;

module.exports = db;
