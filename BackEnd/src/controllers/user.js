const { validationResult } = require('express-validator');
const { User } = require('../models');

module.exports = {
    getUser: async (req, res) => {
        const userId = res.locals.userId;

        const user = await User.findByPk(userId, {
            include: [
                {
                    association: 'userTasks',
                    attributes: [title]
                },
            ],
        });
        return res.status(200).json(user);
    },
    deleteUser: async (req, res) => {
        const { userId } = res.locals;

        /* Exclui e finaliza */
        try {
            await User.destroy({ where: { id: userId } });
            return res.status(200).json({ message: 'User deleted' });
        } catch (erro) {
            return res.status(400).json({ errors: erro });
        }
    },
    updateUser: async (req, res) => {
        const { userId } = res.locals;
        const { name, email, password } = req.body;

        /* Validation  */
        const errors = validationResult(req, userId);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        /* Update */
        try {
            await User.update(
                {
                    name,
                    password,
                    email,
                },
                {
                    where: {
                        id: userId,
                    },
                },
            );

            return res.status(201).json({ message: 'User updated' });
        } catch (erro) {
            return res.status(500).json({ error: erro.message });
        }
    },
};
