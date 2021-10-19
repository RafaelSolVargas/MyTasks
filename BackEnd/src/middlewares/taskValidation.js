const { check, body } = require('express-validator');
const {
    isOnlyLettersNumberSpecials
} = require('../utils/functions');

module.exports = {
    createTaskValidator: [
        /* Name - Somente Letras */
        check('title')
            .notEmpty()
            .withMessage('Title cannot be empty')
            .bail()
            .custom(async (value) => {
                if (!await isOnlyLettersNumberSpecials(value)) { throw new Error('Title has invalid characters'); }
            }),
        /* Email - Único */
        check('description')
            .if(body('description').exists())
            .custom(async (value) => {
                if (!await isOnlyLettersNumberSpecials(value)) { throw new Error('Description has invalid characters'); }
            }),
    ],
    updateTaskValidator: [
        /* Name - Somente Letras */
        check('title')
            .if(body('title').exists())
            .custom(async (value) => {
                if (!await isOnlyLettersNumberSpecials(value)) { throw new Error('Title has invalid characters'); }
            }),
        /* Email - Único */
        check('description')
            .if(body('description').exists())
            .custom(async (value) => {
                if (!await isOnlyLettersNumberSpecials(value)) { throw new Error('Description has invalid characters'); }
            }),
        check('completed')
            .if(body('completed').exists())
            .isBoolean()
            .withMessage('Completed must be boolean value')
    ],
};
