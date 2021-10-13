/* import database aqui */
const { validationResult } = require('express-validator');
const { User } = require('../models');

module.exports = {
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        console.log(req.body)

        /* Validation  */
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(401).json({ ValidationErrors: errors.array() });

        /* User creating */
        try {
            const user = await User.create(
                {
                    name,
                    password,
                    email,
                },
            );
            return res.status(201).json({ user });
        } catch (erro) {
            console.log(erro)
            return res.status(500).json({ UncaughtError: erro.message });
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        /* Validation  */
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(401).json({ errors: errors.array() });

        const user = await User.findOne({ where: { email } });

        if (!await user.checkPassword(password)) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        user.dataValues.token = user.generateToken();
        return res.status(200).json({ user });
    },
};
