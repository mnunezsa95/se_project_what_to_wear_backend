/* eslint-disable consistent-return */
const {
  notFoundErrorCODE,
  idNotFoundError,
  validationErrorCODE,
  serverErrorCODE,
} = require("./errors");

const logError = (err) => {
  console.error(
    `Error ${err.name} with the message ${err.message} has occured while executing the code`,
  );
};

const handleValidationErrors = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(validationErrorCODE).send({ message: "Invalid User" });
  }
};

const handleNotFoundErrors = (err, res) => {
  if (err.name === "NotFoundError") {
    return res.status(notFoundErrorCODE).send({ message: "Not Found" });
  }
  if (err.name === "IdNotFoundError" || err.name === "DocumentNotFoundError") {
    return res
      .status(idNotFoundError)
      .send({ message: "'the specified id not be found'" });
  }
};

// handle any other error that includes "Error"
const handleServerError = (err, res) => {
  if (err.name.includes === "Error") {
    return res
      .status(serverErrorCODE)
      .send({ message: "'an error has occurred on the server'" });
  }
};

module.exports = {
  logError,
  handleValidationErrors,
  handleNotFoundErrors,
  handleServerError,
};
