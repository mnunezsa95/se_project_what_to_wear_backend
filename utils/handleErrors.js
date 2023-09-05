/* eslint-disable consistent-return */
const {
  notFoundErrorCODE,
  validationErrorCODE,
  serverErrorCODE,
  incorrectCredentialsErrorCODE,
  duplicateEmailErrorCODE,
  forbiddenPermissionErrorCODE,
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
  if (
    err.name === "DocumentNotFoundError" ||
    err.message === "the specified id not found"
  ) {
    return res
      .status(notFoundErrorCODE)
      .send({ message: "the specified id not found" });
  }
  if (
    err.message === "incorrect email or password" ||
    err.message.includes("data and hash")
  ) {
    return res
      .status(incorrectCredentialsErrorCODE)
      .send({ message: "incorrect email or password" });
  }
  if (err.name === "DuplicateEmailError") {
    return res
      .status(duplicateEmailErrorCODE)
      .send({ message: "email already exists" });
  }
  if (err.name === "ForbiddenPermissionError") {
    return res
      .status(forbiddenPermissionErrorCODE)
      .send({ message: "forbidden: cannot delete another user's post" });
  }
  return res
    .status(serverErrorCODE)
    .send({ message: "an error has occurred on the server" });
};

module.exports = {
  logError,
  handleAllErrors,
};
