const User = require("../models/user"); // import user model

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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};
