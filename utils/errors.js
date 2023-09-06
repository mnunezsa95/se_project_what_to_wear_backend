// ErrorCodes
const ERROR_404 = 404;
const ERROR_401 = 401;
const ERROR_409 = 409;
const ERROR_400 = 400;
const ERROR_403 = 403;
const ERROR_500 = 500;

const throwDuplicateError = () => {
  const duplicateEmailError = new Error("email already exists");
  duplicateEmailError.name = "DuplicateEmailError";
  throw duplicateEmailError;
};

const throwForbiddenPermissionError = () => {
  const forbiddenPermissionError = new Error(
    "cannot delete another user's post",
  );
  forbiddenPermissionError.name = "ForbiddenPermissionError";
  throw forbiddenPermissionError;
};

const throwIdNotFoundError = () => {
  const idNotFoundError = new Error("the specified id not found");
  idNotFoundError.name = "IdNotFoundError";
  throw idNotFoundError;
};

module.exports = {
  ERROR_404,
  ERROR_401,
  ERROR_409,
  ERROR_400,
  ERROR_403,
  ERROR_500,
  throwDuplicateError,
  throwForbiddenPermissionError,
  throwIdNotFoundError,
};
