const { Router } = require('express');

/* Controllers */
const { createUser, loginUser } = require('../controllers/auth');

/* Validations */
const { createUserValidator, loginUserValidator } = require('../middlewares/authValidation');

const authRouter = Router();

authRouter
    .post('/login', loginUserValidator, loginUser) // Login do usuário
    .post('/', createUserValidator, createUser); // Rota para cadastrar usuário

module.exports = authRouter;
