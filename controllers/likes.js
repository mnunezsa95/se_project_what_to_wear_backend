const ClothingItem = require("../models/clothingItem");
const { IdNotFoundError } = require("../utils/errors");

const {
  logError,
  handleValidationErrors,
  handleNotFoundErrors,
  handleServerError,
} = require("../utils/handleErrors");

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
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
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
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};
