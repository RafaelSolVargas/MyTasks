const { Router } = require('express');

/* routes import */
const userRouter = require('./user');
const authRouter = require('./auth');
const taskRouter = require('./task');


const router = Router();

/* routers  */
router
    .use('/auth', authRouter)
    .use('/users', userRouter)
    .use('/tasks', taskRouter)

module.exports = router;
