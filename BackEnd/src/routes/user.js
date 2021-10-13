const { Router } = require('express');

/* Controllers */
const { getUser, deleteUser, updateUser } = require('../controllers/user')

/* MiddleWares e Validator geral */
const { isAuthenticated } = require('../middlewares/isAuth');

const userRouter = Router();
userRouter
    .use(isAuthenticated);

userRouter
    .get('/', getUser) // USER - Ele mesmo
    .put('/', updateUser) // Rota para atualizar um usuário
    .delete('/', deleteUser) // Rota para o usuário se deletar

module.exports = userRouter;
