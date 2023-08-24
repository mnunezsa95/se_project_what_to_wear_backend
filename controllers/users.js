const User = require("../models/user"); // import user model
const {
  logError,
  handleValidationErrors,
  handleNotFoundErrors,
  handleServerError,
} = require("../utils/handleErrors");

module.exports.getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};

module.exports.getUser = (req, res) => {
  console.log(req.params);
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};
