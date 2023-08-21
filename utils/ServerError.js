class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = ServerError;
    this.statusCode = 500;
    this.message = "An error has occurred on the server";
  }
}

module.exports = { ServerError };
