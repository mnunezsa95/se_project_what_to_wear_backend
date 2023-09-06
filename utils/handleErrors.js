const {
  ERROR_404,
  ERROR_401,
  ERROR_409,
  ERROR_400,
  ERROR_403,
  ERROR_500,
} = require("./errors");

const logError = (err) => {
  console.error(
    `Error ${err.name} with the message ${err.message} has occured while executing the code`,
  );
};

const handleErrors = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(ERROR_400).send({ message: "invalid user" });
  }
  if (err.name === "NotFoundError") {
    return res.status(ERROR_404).send({ message: "not found" });
  }
  if (err.name === "DocumentNotFoundError" || err.name === "IdNotFoundError") {
    return res
      .status(ERROR_404)
      .send({ message: "the specified id not found" });
  }
  if (
    err.message === "incorrect email or password" ||
    err.message.includes("data and hash")
  ) {
    return res
      .status(ERROR_401)
      .send({ message: "incorrect email or password" });
  }
  if (err.name === "DuplicateEmailError") {
    return res.status(ERROR_409).send({ message: "email already exists" });
  }
  if (err.name === "ForbiddenPermissionError") {
    return res
      .status(ERROR_403)
      .send({ message: "cannot delete another user's post" });
  }
  return res
    .status(ERROR_500)
    .send({ message: "an error has occurred on the server" });
};

module.exports = {
  logError,
  handleErrors,
};
