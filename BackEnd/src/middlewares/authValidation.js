const { check, body } = require('express-validator');
const {
    isOnlyLetters, searchEmail, validatePassword,
} = require('../utils/functions');

module.exports = {
    createUserValidator: [
        /* Name - Somente Letras */
        check('name')
            .notEmpty()
            .withMessage('Name cannot be empty')
            .bail()
            .custom(async (value) => {
                if (!await isOnlyLetters(value)) { throw new Error('Name must have only letters'); }
            }),
        /* Email - Único */
        check('email')
            .notEmpty()
            .withMessage('Email cannot be empty')
            .isEmail()
            .withMessage('Email invalid')
            .bail()
            .custom(async (value) => {
                if (await searchEmail(value)) { throw new Error('Email already used'); }
            }),

        /* Senha - 1 minúscula 1 maiúscula, 1 especial, 1 number, 8-16 */
        check('password')
            .notEmpty()
            .withMessage('New password cannot be empty')
            .bail()
            .custom(async (value) => {
                if (!await validatePassword(value)) {
                    throw new Error('The password must have Minimum 10 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character');
                }
            }),
        check('confirmPassword')
            .notEmpty()
            .withMessage('Confirmed Password cannot be empty')
            .custom(async (value, { req }) => {
                if (value !== req.body.password) throw new Error('Senhas diferentes');
            })
    ],
    loginUserValidator: [
        check('email')
            .notEmpty()
            .withMessage('Email cannot be empty')
            .isEmail()
            .withMessage('Email is invalid')
            .bail()
            .custom(async (value) => {
                if (!await searchEmail(value)) { throw new Error('User not found'); }
            }),
        check('password')
            .notEmpty()
            .withMessage('Password cannot be empty'),
    ],
};
