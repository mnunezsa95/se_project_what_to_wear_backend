const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import user model
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../Errors/UnauthorizedError");
const { ConflictError } = require("../Errors/ConflictError");
const { BadRequestError } = require("../Errors/BadRequestError");
const { NotFoundError } = require("../Errors/NotFoundError");

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
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
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
    .catch(() => next(new UnauthorizedError("incorrect email or password")));
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError("a user with the specified id not found");
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "NotFoundError") next(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
};
