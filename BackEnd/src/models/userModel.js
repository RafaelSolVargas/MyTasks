/* eslint no-param-reassign: "error" */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authEnv')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            timestamps: true, // Cria as colunas updatedAt e createdAt
            updatedAt: false, // Remove a coluna updatedAt
            createdAt: 'dateRegistration', //  Troca o nome da coluna createdAt
            hooks: {
                beforeSave: async (user) => { // Hooks chamados com eventos
                    if (user.password) {
                        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                    }
                },
                afterCreate: async (user) => { // Gera o Token e apaga a senha
                    user.dataValues.token = user.generateToken();
                    user.dataValues.password = undefined;
                },
                beforeBulkUpdate: async (user) => { // Salva a senha enviada para atualizar
                    if (user.attributes.password) {
                        user.attributes.password = bcrypt.hashSync(user.attributes.password,
                            bcrypt.genSaltSync(10));
                    }
                },
            },
            /* Scope padrão, não dando select na senha */
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            /* Scope para selecionar a senha */
            scopes: {
                withPassword: {
                    attributes: {},
                },
            },
        },
    );

    // Método de instâncias, gera um token, armazenando o Id do usuário no token, permitindo
    // que não seja necessário outros métodos de identificar e garantir que o usuário é ele mesmo
    User.prototype.generateToken = function generateToken() {
        const token = jwt.sign({ id: this.id }, authConfig.appSecret, {
            expiresIn: authConfig.expiresTime,
        });
        return token;
    };

    // Método de instâncias
    User.prototype.checkPassword = async function checkPassword(password) {
        // Busca novamente o mesmo usuário, dessa vez selecionando a senha e comparando-as
        const user = await User.scope('withPassword').findByPk(this.id);
        return bcrypt.compareSync(password, user.dataValues.password);
    };

    // Função que irá criar o relacionamento entre as tabelas, Método de Classe
    User.associate = function associate(models) {
        this.hasMany(models.Task, { foreignKey: 'userId', as: 'userTasks' });
    };

    return User;
};
