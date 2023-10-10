const { UnauthorizedError } = require("../Errors/UnauthorizedError");

const handleAuthError = () => {
  throw new UnauthorizedError("authorization required");
};

module.exports = { handleAuthError };
