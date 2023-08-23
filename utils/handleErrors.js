/* eslint-disable consistent-return */
const { ValidationError, ServerError, NotFoundError } = require("./errors");

const handleValidationErrors = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    const validationError = new ValidationError();
    return res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
  }
};

const handleNotFoundErrors = (err, res) => {
  if (err.name === "NotFoundError" || err.name === "IdNotFoundError") {
    const notFoundError = new NotFoundError();
    return res
      .status(notFoundError.statusCode)
      .send({ message: notFoundError.message });
  }
};

const handleServerError = (err, res) => {
  const serverError = new ServerError();
  return res.status(serverError.statusCode).send(serverError.message);
};

module.exports = {
  handleValidationErrors,
  handleNotFoundErrors,
  handleServerError,
};
