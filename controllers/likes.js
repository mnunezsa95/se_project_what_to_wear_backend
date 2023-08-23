const ClothingItem = require("../models/clothingItem");
const {
  ServerError,
  NotFoundError,
  ValidationError,
  IdNotFoundError,
} = require("../utils/errors");

/* ---------------------------------------------------------------------------------------------- */
/*                                           Code Works                                           */
/* ---------------------------------------------------------------------------------------------- */
module.exports.updateLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      const idNotFoundError = new IdNotFoundError();
      throw idNotFoundError;
    })
    .then((like) => {
      res.status(200).send({ data: like });
    })
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (err.name === "ValidationError" || err.name === "CastError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      if (err.name === "NotFoundError" || err.name === "IdNotFoundError") {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: notFoundError.message });
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
};

module.exports.removeLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      const idNotFoundError = new IdNotFoundError();
      throw idNotFoundError;
    })
    .then((like) => {
      res.status(200).send({ data: like });
    })
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (err.name === "ValidationError" || err.name === "CastError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      if (err.name === "NotFoundError" || err.name === "IdNotFoundError") {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: notFoundError.message });
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
};
