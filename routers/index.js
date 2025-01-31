const rootRouter = require('express').Router();
const manufacturerRouter = require('./manufacturersRouter');

rootRouter.use('/manufacturers', manufacturerRouter);

module.exports = rootRouter;