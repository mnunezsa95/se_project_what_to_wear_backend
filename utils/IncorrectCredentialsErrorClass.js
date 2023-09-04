// error for incorrect username / password
class IncorrectCredentialsErrorCode extends Error {
  constructor(message) {
    super(message);
    this.name = "IncorrectCredentialsErrorCode";
    this.message = "incorrect email or password";
    this.statusCode = 401;
  }
}

module.exports = {
  IncorrectCredentialsErrorCode,
};
