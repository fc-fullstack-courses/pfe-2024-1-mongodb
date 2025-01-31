const manufacturerRouter = require('express').Router();
const ManufacturersController = require('../controllers/manufacturersController');

manufacturerRouter.post('/', ManufacturersController.createManufacturer);
manufacturerRouter.get('/', ManufacturersController.getManufacturers);

manufacturerRouter.get('/:manufacturerId', ManufacturersController.getManufacturer);
manufacturerRouter.put('/:manufacturerId', ManufacturersController.updateManufacturer);
manufacturerRouter.delete('/:manufacturerId', ManufacturersController.deleteManufacturer);

module.exports = manufacturerRouter;