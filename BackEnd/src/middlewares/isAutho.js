const { Task } = require('../models');

module.exports = {
    canAccessTask: async (req, res, next) => {
        const { userId } = res.locals;
        const { taskId } = req.params;

        const task = await Task.findByPk(taskId)

        if (!task) return res.status(401).json({ error: 'Unauthorized' })

        if (task.userId !== userId) return res.status(401).json({ error: 'Unauthorized' })
        else next()
    }
};
