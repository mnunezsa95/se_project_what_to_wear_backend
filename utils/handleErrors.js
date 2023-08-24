/* eslint-disable consistent-return */
const { ValidationError, ServerError, NotFoundError } = require("./errors");

const logError = (err) => {
  console.error(
    `Error ${err.name} with the message ${err.message} has occured while executing the code`,
  );
};

const handleValidationErrors = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    const validationError = new ValidationError();
    return res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
  }
};

const handleNotFoundErrors = (err, res) => {
  if (
    err.name === "NotFoundError" ||
    err.name === "IdNotFoundError" ||
    err.name === "DocumentNotFoundError"
  ) {
    const notFoundError = new NotFoundError();
    return res
      .status(notFoundError.statusCode)
      .send({ message: notFoundError.message });
  }
};

// handle any other error that includes "Error"
const handleServerError = (err, res) => {
  if (err.name.includes === "Error") {
    const serverError = new ServerError();
    return res
      .status(serverError.statusCode)
      .send({ message: serverError.message });
  }
};

module.exports = {
  logError,
  handleValidationErrors,
  handleNotFoundErrors,
  handleServerError,
};
