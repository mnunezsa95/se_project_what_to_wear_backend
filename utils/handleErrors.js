/* eslint-disable consistent-return */
const {
  notFoundErrorCODE,
  idNotFoundError,
  validationErrorCODE,
  serverErrorCODE,
  incorrectCredentialsErrorCode,
} = require("./errors");

const logError = (err) => {
  console.error(
    `Error ${err.name} with the message ${err.message} has occured while executing the code`,
  );
};

const handleAllErrors = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(validationErrorCODE).send({ message: "Invalid User" });
  }
  if (err.name === "NotFoundError") {
    return res.status(notFoundErrorCODE).send({ message: "Not Found" });
  }
  if (err.name === "IdNotFoundError" || err.name === "DocumentNotFoundError") {
    return res
      .status(idNotFoundError)
      .send({ message: "the specified id not be found" });
  }
  if (err.name === "IncorrectCredentialsErrorCode") {
    return res
      .status(incorrectCredentialsErrorCode)
      .send({ message: "incorrect email or password" });
  }
  return res
    .status(serverErrorCODE)
    .send({ message: "an error has occurred on the server" });
};

module.exports = {
  logError,
  handleAllErrors,
};
