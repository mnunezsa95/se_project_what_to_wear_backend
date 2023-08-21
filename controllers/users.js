const User = require("../models/user"); // import user model
const {
  ValidationError,
  ServerError,
  NotFoundError,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(500).send(users))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.statusCode);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.statusCode);
    });
};

module.exports.getUser = (req, res) => {
  console.log(req);
  User.findById(req.params.id)
    .orFail(() => {
      const userDoesNotExistError = new Error("This user does not exist");
      userDoesNotExistError.name("DoesNotExistError");
      userDoesNotExistError.status(404);
      throw userDoesNotExistError;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.statusCode);
    });
};

module.exports.createUser = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
};
