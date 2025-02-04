const manufacturerRouter = require('express').Router();
const productsRouter = require('./productsRouter');
const ManufacturersController = require('../controllers/manufacturersController');
const { findManufacturer } = require('../middlewares/manufacturersMW');

// manufacturerRouter.post('/', ManufacturersController.createManufacturer);
// manufacturerRouter.get('/', ManufacturersController.getManufacturers);
manufacturerRouter
  .route('/')
  .post(ManufacturersController.createManufacturer)
  .get(ManufacturersController.getManufacturers);

// manufacturerRouter.get(
//   '/:manufacturerId',
//   ManufacturersController.getManufacturer
// );
// manufacturerRouter.put(
//   '/:manufacturerId',
//   ManufacturersController.updateManufacturer
// );
// manufacturerRouter.delete(
//   '/:manufacturerId',
//   ManufacturersController.deleteManufacturer
// );
manufacturerRouter
  .route('/:manufacturerId')
  .get(ManufacturersController.getManufacturer)
  .put(ManufacturersController.updateManufacturer)
  .delete(ManufacturersController.deleteManufacturer);

manufacturerRouter.use('/:manufacturerId/products', findManufacturer, productsRouter);

module.exports = manufacturerRouter;
