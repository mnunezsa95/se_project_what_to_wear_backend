const User = require("../models/user"); // import user model
const {
  ValidationError,
  ServerError,
  NotFoundError,
} = require("../utils/errors");

/* ---------------------------------------------------------------------------------------------- */
/*                                      The Code Below Works                                      */
/* ---------------------------------------------------------------------------------------------- */
module.exports.getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (err.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });
};

/* ---------------------------------------------------------------------------------------------- */
/*                                      The Code Below Works                                      */
/* ---------------------------------------------------------------------------------------------- */
module.exports.getUser = (req, res) => {
  console.log(req.params);
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (
        err.name === "NotFoundError" ||
        err.name === "DocumentNotFoundError"
      ) {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: notFoundError.message });
      }
      if (err.name === "ValidationError" || err.name === "CastError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });
};

/* ---------------------------------------------------------------------------------------------- */
/*                                      The Code Below Works                                      */
/* ---------------------------------------------------------------------------------------------- */
module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (err.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });
};
