const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import user model
const { JWT_SECRET } = require("../utils/config");
const { logError, handleAllErrors } = require("../utils/handleErrors");
const {
  throwDuplicateError,
  throwValidationError,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.getUser = (req, res) => {
  console.log(req.params);
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!email) {
        throwValidationError();
      }
      if (user) {
        throwDuplicateError();
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ name, avatar, email, password: hash }).then((user) => {
        res.send({ name: user.name, avatar: user.avatar, email: user.amil }); //! Select: false on the schema was not working
      });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ data: token });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
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
      res.send({ data: user });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};
