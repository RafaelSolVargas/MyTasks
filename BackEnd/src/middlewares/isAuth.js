const jwt = require('jsonwebtoken');
const teste = require('../config/authEnv')
const { User } = require('../models');

module.exports = {
    /* Autentica o usuário, não se importado com qual Role ele seja */
    isAuthenticated: (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send({ error: 'No token provided' });

        const parts = authHeader.split(' ');
        if (!parts.length === 2) return res.status(401).send({ error: 'Token error' });

        const [scheme, token] = parts;
        if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformed' });

        jwt.verify(token, authConfig.appSecret, async (err, decoded) => {
            if (err) return res.status(401).send({ error: 'Token invalid' });

            const user = await User.findByPk(decoded.id);

            // Busca o usuário, verificando se ele ainda existe, e passando para os próximos middlewares
            if (!user) { return res.status(401).json({ error: 'User not found' }); }

            return next(); // Continua a requisição com o usuário autenticado
        });
    },
};
