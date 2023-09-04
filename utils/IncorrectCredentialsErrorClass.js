// error for incorrect username / password
class IncorrectCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectCredentialsError";
    this.message = "incorrect email or password";
    this.statusCode = 401;
  }
}

module.exports = {
  IncorrectCredentialsError,
};
