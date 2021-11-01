require('dotenv').config();
const { associateModels, stablishConnection } = require('./src/models');

async function initializeServer() {
    const sequelize = await stablishConnection() /* Await the BackEnd connect to Heroku Database */
    await associateModels(sequelize) /* Start the associations between the tables  */
    await sequelize.sync() /* Sync the database of Heroku with this */

    const app = require('./src/app'); /* creating the the app */

    /* Esse process.env.PORT será escolhido pelo Heroku */
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, console.log(`Server online at localhost:${PORT}`));
}

initializeServer()