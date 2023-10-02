module.exports.errorHandler = (err, req, res, next) => {
  console.log(req);
  res.status(err.statusCode).send({ message: err.message });
};
