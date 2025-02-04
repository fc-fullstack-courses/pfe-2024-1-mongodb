const { Product } = require('../models');

module.exports.createProduct = async (req, res, next) => {
  try {
    const { body, manufacturer } = req;

    // 1. при створенні продукту засовуємо айді виробника йому
    const product = await Product.create({
      ...body,
      manufacturer: manufacturer._id,
    });

    // 2. також занесемо айді створенного продукту виробнику
    await manufacturer.updateOne({ $push: { products: product._id } });

    res.status(201).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .select('-__v')
      .populate('manufacturer');

    res.send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductsOfManufacturer = async (req, res, next) => {
  try {
    const { manufacturer } = req;

    const products = await Product.find(
      { manufacturer: manufacturer._id },
      '-__v'
    );

    res.send({ data: products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const product = await Product.findById(productId, '-__v').populate(
      'manufacturer'
    );

    res.send({ data: product });
  } catch (error) {
    next(error);
  }
};
