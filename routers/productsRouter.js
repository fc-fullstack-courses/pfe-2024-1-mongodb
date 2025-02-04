const productsRouter = require('express').Router({ mergeParams: true });
const ProductController = require('../controllers/productsController');

productsRouter
  .route('/')
  .post(ProductController.createProduct)
  .get(ProductController.getProductsOfManufacturer);

module.exports = productsRouter;
