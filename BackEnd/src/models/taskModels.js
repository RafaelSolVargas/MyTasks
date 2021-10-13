/* eslint no-param-reassign: "error" */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const teste = require('../config/authEnv')

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            title: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            timestamps: true, // Cria as colunas updatedAt e createdAt
            updatedAt: false, // Remove a coluna updatedAt
            createdAt: 'dateRegistration', //  Troca o nome da coluna createdAt
        },
    );

    // Função que irá criar o relacionamento entre as tabelas, Método de Classe
    Task.associate = function associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'userTasks' });
    };

    return Task;
};
