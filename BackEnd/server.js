/* Criação do App  */
const app = require('./src/app');

const PORT = process.env.DEV_PORT || 5000;
app.listen(PORT, console.log(`Server online at localhost:${PORT}`));
