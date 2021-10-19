const { Router } = require('express');

/* Controllers */
const { createTask, updateTask, deleteTask, getTasks } = require('../controllers/tasks')

/* MiddleWares e Validator geral */
const { isAuthenticated } = require('../middlewares/isAuth');
const { canAccessTask } = require('../middlewares/isAutho');
const { createTaskValidator, updateTaskValidator } = require('../middlewares/taskValidation');

const taskRouter = Router();
taskRouter
    .use(isAuthenticated);

taskRouter
    .get('/', getTasks) // User get all his tasks
    .post('/', createTaskValidator, createTask) // User create a tasks for him
    .put('/:taskId', canAccessTask, updateTaskValidator, updateTask) // user update some task
    .delete('/:taskId', canAccessTask, deleteTask) // user delete some task

module.exports = taskRouter;
