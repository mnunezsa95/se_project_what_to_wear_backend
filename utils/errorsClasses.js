/* eslint-disable max-classes-per-file */

// These errors are not being used at the moment. Keeping for potential future use.
// If used in future, will need to separate into different classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = ValidationError;
    this.statusCode = 400;
    this.message = "Invalid User";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = NotFoundError;
    this.statusCode = 404;
    this.message = "Not Found";
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = ServerError;
    this.statusCode = 500;
    this.message = "'an error has occurred on the server'";
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  ServerError,
};
