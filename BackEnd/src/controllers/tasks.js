const { validationResult } = require('express-validator');
const { Task } = require('../models');

module.exports = {
    getTasks: async (req, res) => {
        const userId = res.locals.userId;

        const tasks = await Task.findAll({ where: { userId } })

        return res.status(200).json(tasks);
    },
    deleteTask: async (req, res) => {
        const { taskId } = req.params;

        /* Exclui e finaliza */
        try {
            await Task.destroy({ where: { id: taskId } });
            return res.status(200).json({ message: 'Task Deleted' });
        } catch (erro) {
            return res.status(400).json({ errors: erro });
        }
    },
    updateTask: async (req, res) => {
        const { taskId } = req.params;
        const { title, description } = req.body;

        /* Validation  */
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        /* Update */
        try {
            await Task.update(
                {
                    title,
                    description,
                },
                {
                    where: {
                        id: taskId,
                    },
                },
            );

            return res.status(201).json({ message: 'Task updated' });
        } catch (erro) {
            return res.status(500).json({ error: erro.message });
        }
    },
    createTask: async (req, res) => {
        const { title, description } = req.body;
        const { userId } = res.locals;

        /* Validation  */
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(401).json({ ValidationErrors: errors.array() });

        /* Task creating */
        try {
            const task = await Task.create(
                {
                    userId,
                    title,
                    description,
                },
            );

            return res.status(201).json({ task });
        } catch (erro) {
            return res.status(500).json({ UncaughtError: erro.message });
        }
    },
};
