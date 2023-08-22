const User = require("../models/user"); // import user model
const {
  ValidationError,
  ServerError,
  NotFoundError,
} = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err.name);
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
  User.findById(req.params.id)
    .orFail(() => {
      const userDoesNotExistError = new Error("This user does not exist");
      userDoesNotExistError.name = "DoesNotExistError";
      userDoesNotExistError.statusCode = 404;
      throw userDoesNotExistError;
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "NotFoundError" || err.name === "DoesNotExistError") {
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
};

module.exports.createUser = (req, res) => {
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
