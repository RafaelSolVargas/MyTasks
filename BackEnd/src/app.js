const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
require('./models/index');


class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors('*'));
    }

    routes() {
        this.express.use('/api/v1/', router);
    }
}

module.exports = new AppController().express;
