const { Product } = require('../models');

module.exports.createProduct = async (req, res, next) => {
  try {
    const {
      body,
      manufacturer
    } = req;
  
    // 1. при створенні продукту засовуємо айді виробника йому
    const product = await Product.create({
      ...body,
      manufacturer: manufacturer._id,
    });

    // 2. також занесемо айді створенного продукту виробнику
    await manufacturer.updateOne({ $push : { products: product._id }});

    res.status(201).send({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .select('-__v');

    res.send({ data: products });
  } catch (error) {
    next(error);
  }
};
