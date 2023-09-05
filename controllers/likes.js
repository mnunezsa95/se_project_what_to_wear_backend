const ClothingItem = require("../models/clothingItem");

// import functions for handling errors
const { logError, handleAllErrors } = require("../utils/handleErrors");

module.exports.updateLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throw new Error("the specified id not found");
    })
    .then((like) => {
      res.send({ data: like });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.removeLike = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      throw new Error("the specified id not found");
    })
    .then((like) => {
      res.send({ data: like });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};
