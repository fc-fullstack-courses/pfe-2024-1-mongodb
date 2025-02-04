const rootRouter = require('express').Router();
const manufacturerRouter = require('./manufacturersRouter');
const ProductController = require('../controllers/productsController');

rootRouter.use('/manufacturers', manufacturerRouter);

rootRouter.route('/products').get(ProductController.getAllProducts);

rootRouter.get('/products/:productId', ProductController.getProduct);
rootRouter.put('/products/:productId', ProductController.updateProduct);
rootRouter.delete('/products/:productId', ProductController.deleteProduct);

module.exports = rootRouter;
