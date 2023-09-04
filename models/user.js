const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const {
  IncorrectCredentialsErrorCode,
} = require("../utils/IncorrectCredentialsErrorClass");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      const incorrectCredentialsErrorCode = new IncorrectCredentialsErrorCode();
      throw incorrectCredentialsErrorCode;
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        const incorrectCredentialsErrorCode =
          new IncorrectCredentialsErrorCode();
        throw incorrectCredentialsErrorCode;
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
