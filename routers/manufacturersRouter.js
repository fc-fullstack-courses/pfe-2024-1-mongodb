const manufacturerRouter = require('express').Router();
const ManufacturersController = require('../controllers/manufacturersController');

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

module.exports = manufacturerRouter;
