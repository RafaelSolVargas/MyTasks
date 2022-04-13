const fs = require('fs');
const Sequelize = require('sequelize')
const path = require('path');
const basename = path.basename(__filename);
const config = require('../config/dbConfig')

const db = {};
let sequelize;

async function stablishConnection() {
    return new Promise((resolve, reject) => {
        sequelize = new Sequelize(config);

        sequelize
            .authenticate()
            .then(() => {
                db.sequelize = sequelize
                resolve(sequelize)
            })
            .catch((err) => {
                console.error("Unable to connect to the database:", err)
                reject('Connection with database failed')
            });
    })
}

async function associateModels(sequelize) {
    /* Pass for all files of this folder, import the Model and store in db object */
    fs
        .readdirSync(__dirname)
        .filter(
            (file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'),
        )
        .forEach((file) => {
            const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        });

    /* Execute the sync with Heroku Database before going to associate */
    await sequelize.sync()

    /* Chama a associação de cada Model */
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
            db[modelName].sync()
        }
    });
}

db.stablishConnection = stablishConnection
db.associateModels = associateModels
module.exports = db;
