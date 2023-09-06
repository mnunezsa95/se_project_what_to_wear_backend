const ClothingItem = require("../models/clothingItem");
const { logError, handleErrors } = require("../utils/handleErrors");
const { throwIdNotFoundError } = require("../utils/errors");

module.exports.updateLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throwIdNotFoundError();
    })
    .then((like) => {
      res.send({ data: like });
    })
    .catch((err) => {
      logError(err);
      handleErrors(err, res);
    });
};

module.exports.removeLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      throwIdNotFoundError();
    })
    .then((like) => {
      res.send({ data: like });
    })
    .catch((err) => {
      logError(err);
      handleErrors(err, res);
    });
};
