module.exports.createManufacturer = async (req, res, next) => {
  try {
    const { body } = req;

    res.status(201).send({ data: 'Manufacturer Created' });
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    res.status(200).send({ data: 'Manufacturer Found.' });
  } catch (error) {
    next(error);
  }
};

module.exports.getManufacturers = async (req, res, next) => {
  try {
    const { query } = req;

    res.status(200).send({ data: 'Manufacturers Found.' });
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

    res.status(200).send({ data: 'Manufacturer Updated' });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteManufacturer = async (req, res, next) => {
  try {
    const {
      params: { manufacturerId },
    } = req;

    res.status(200).send({ data: 'Manufacturer Deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports.createManufacturer = async (req, res, next) => {
  try {
    const { body } = req;

    res.status(201).send({ data: 'Manufacturer Created' });
  } catch (error) {
    next(error);
  }
};
