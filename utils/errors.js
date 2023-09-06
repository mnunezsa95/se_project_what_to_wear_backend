// ErrorCodes
const ERROR_404 = 404; // not found
const ERROR_401 = 401; // authorization
const ERROR_409 = 409; // incorrect credentials
const ERROR_400 = 400; // validation
const ERROR_403 = 403; // forbidden permission
const ERROR_500 = 500; // server error

const throwDuplicateError = () => {
  const duplicateEmailError = new Error("email already exists");
  duplicateEmailError.name = "DuplicateEmailError";
  throw duplicateEmailError;
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
  throwIdNotFoundError,
};
