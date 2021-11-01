module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        'Task',
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: { model: 'User', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            dateRegistration: {
                type: DataTypes.DATE,
                allowNull: false,
            },
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
