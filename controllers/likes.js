const ClothingItem = require("../models/clothingItem");
const { BadRequestError } = require("../Errors/BadRequestError");
const { NotFoundError } = require("../Errors/NotFoundError");

module.exports.updateLike = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("an item with the specified id not found");
    })
    .then((item) => res.send({ item }))
    .catch((err) => {
      if (err.name === "NotFoundError") next(err);
      next(new BadRequestError("invalid data"));
    });
};

module.exports.removeLike = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("an item with the specified id not found");
    })
    .then((item) => res.send({ item }))
    .catch((err) => {
      if (err.name === "NotFoundError") next(err);
      next(new BadRequestError("invalid data"));
    });
};
