/* Criação do App  */
const app = require('./src/app');

/* Esse process.env.PORT será escolhido pelo Heroku */
const PORT = process.env.PORT || 3333;
app.listen(PORT, console.log(`Server online at localhost:${PORT}`));
