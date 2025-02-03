const { Manufacturer } = require('../models');

module.exports.createManufacturer = async (req, res, next) => {
  try {
    const { body } = req;

    // створення 1 екземпляру
    const manufacturer = await Manufacturer.create(body);

    // створення багатьох екземплярів
    // const manufacturers = await Manufacturer.insertMany([
    //   body,
    //   ...
    // ])

    res.status(201).send({ data: manufacturer });
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    // const [manufacturer] = await Manufacturer.find({ _id: manufacturerId });

    // const manufacturer = await Manufacturer.findOne({ _id: manufacturerId });

    const manufacturer = await Manufacturer.findById(manufacturerId, '-__v')
    // .select(
    //   // залишити тількі певні рядки
    //   // 'name foundingDate estimatedValue'
    //   // {
    //   //   name: 1,
    //   //   foundingDate: 1,
    //   //   estimatedValue: 1
    //   // },
    //   // ['name','foundingDate', 'estimatedValue']
    //   // прибрати конкретні рядки
    //   // '-__v'
    //   // {
    //   //   __v: 0,
    //   //   estimatedValue: 0
    //   // },
    //  ['-__v', '-name', '-address']
    // );

    res.status(200).send({ data: manufacturer });
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturers = async (req, res, next) => {
  try {
    const { query } = req;

    const manufacturers = await Manufacturer.find();

    res.status(200).send({ data: manufacturers });
  } catch (error) {
    next(error);
  }
};

module.exports.updateManufacturer = async (req, res, next) => {
  try {
    const {
      body,
      params: { manufacturerId },
    } = req;

    // const manufacturer = await Manufacturer.findOneAndUpdate({_id: manufacturerId}, body, {
    //   new: true // змушує БД повертати дані після оновлення
    // });

    const manufacturer = await Manufacturer.findByIdAndUpdate(manufacturerId, body, {
      new: true // змушує БД повертати дані після оновлення
    }).select('-__v');

    res.status(200).send({ data: manufacturer });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    const manufacturer = await Manufacturer.findByIdAndDelete(manufacturerId, {projection: '-__v'})
    .select('-__v');

    res.status(200).send({ data: manufacturer });
  } catch (error) {
    next(error);
  }
};
