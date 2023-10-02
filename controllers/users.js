const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import user model
const { JWT_SECRET } = require("../utils/config");
const { logError, handleErrors } = require("../utils/handleErrors");
const { UnauthorizedError } = require("../Errors/UnauthorizedError");
const { ConflictError } = require("../Errors/ConflictError");
const { BadRequestError } = require("../Errors/BadRequestError");

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user)
        throw new ConflictError("a user with this email already exists");
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      res.send({ name: user.name, avatar: user.avatar, email: user.email });
    })
    .catch((err) => {
      if (err.name === "ConflictError") next(err);
      next(new BadRequestError("invalid data"));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("incorrect email or password"));
    });
};

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      logError(err);
      handleErrors(err, res);
    });
};

module.exports.updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      logError(err);
      handleErrors(err, res);
    });
};
