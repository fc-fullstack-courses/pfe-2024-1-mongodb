module.exports = async (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).send({
    errors: [error.message],
  });
};
