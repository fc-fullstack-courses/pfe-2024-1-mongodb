const createError = require('http-errors');
const { Product, Manufacturer } = require('../models');

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

module.exports.updateProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
      body,
    } = req;

    // 1. якщо ми оновлюємо виробника, чи існує новий виробник
    if (body.manufacturer) {
      const newManufacturer = await Manufacturer.findById(body.manufacturer);

      if (!newManufacturer) {
        throw createError(404, 'Manufacturer doesnt exist.');
      }
    }

    // 2. оновити продукт
    const product = await Product.findByIdAndUpdate(productId, body);

    // 3. за потреби оновити дані у нового та старого виробника
    if (body.manufacturer) {
      // 3.1 старому виробнику треба буде видали продукт з масиву
      await Manufacturer.updateOne(
        { _id: product.manufacturer },
        {
          $pull: {
            products: product._id,
          },
        }
      );

      // 3.2 новому виробнико його треба буде додати до масиву
      await Manufacturer.updateOne(
        { _id: body.manufacturer },
        {
          $push: { products: product._id },
        }
      );
    }

    // 4. повернути оновлений продукт
    const updatedProduct = await Product.findById(productId, '-__v').populate(
      'manufacturer'
    );

    res.send({ data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteProduct = async (req, res, next) => {
  try {
    const {
      params: { productId },
    } = req;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if(!deletedProduct) {
      throw createError(404, 'Product does not exist.');
    }

    await Manufacturer.updateOne(
      { _id: deletedProduct.manufacturer },
      {
        $pull: {
          products: deletedProduct._id,
        },
      }
    );

    res.send({ data: deletedProduct });
  } catch (error) {
    next(error);
  }
};
