/* eslint-disable max-classes-per-file */

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

class IdNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.message = "'the specified id not be found'";
    this.name = "IdNotFoundError";
    this.statusCode = 404;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  ServerError,
  IdNotFoundError,
};
