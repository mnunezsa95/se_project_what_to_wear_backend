// Class used for orFail()

class IdNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = "'the specified id not be found'";
    this.name = "IdNotFoundError";
    this.statusCode = 404;
  }
}

module.exports = {
  IdNotFoundError,
};
