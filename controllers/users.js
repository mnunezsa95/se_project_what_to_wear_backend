const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import user model
const { JWT_SECRET } = require("../utils/config");

// import functions for handling errors
const { logError, handleAllErrors } = require("../utils/handleErrors");

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
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        console.log(user);
        res.send({ data: user });
      })
      .catch((err) => {
        logError(err);
        handleAllErrors(err, res);
      });
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
