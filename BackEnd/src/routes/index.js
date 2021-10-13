const { Router } = require('express');

/* routes import */
const userRouter = require('./user');
const authRouter = require('./auth');


const router = Router();

/* routers  */
router
    .use('/auth', authRouter)
    .use('/users', userRouter)

module.exports = router;
