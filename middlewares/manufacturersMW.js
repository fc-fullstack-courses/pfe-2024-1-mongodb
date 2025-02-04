const createError = require('http-errors');
const { Manufacturer } = require('../models');

module.exports.findManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    const manufacturer = await Manufacturer.findById(manufacturerId, '-__v');

    if (!manufacturer) {
      throw createError(404, 'Manufacturer not found.');
    }

    req.manufacturer = manufacturer;

    next();
  } catch (error) {
    next(error);
  }
};
