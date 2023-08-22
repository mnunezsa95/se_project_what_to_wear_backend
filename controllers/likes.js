const ClothingItem = require("../models/clothingItem");
const { ServerError, NotFoundError } = require("../utils/errors");

module.exports.updateLike = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      const addLikeError = new Error("No card found with that id");
      addLikeError.name = "AddLikeError";
      addLikeError.statusCode = 404;
      throw addLikeError;
    })
    .then((like) => {
      res.status(200).send({ data: like });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });

module.exports.removeLike = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => {
      const removeLikeError = new Error("No card found with that id");
      removeLikeError.name = "RemoveLikeError";
      removeLikeError.statusCode = 404;
      throw removeLikeError;
    })
    .then((like) => {
      res.status(200).send({ data: like });
    })
    .catch((err) => {
      console.log(err);
      if (err.name && err.name === "NotFoundError") {
        const notFoundError = new NotFoundError();
        return res.status(notFoundError.statusCode).send(notFoundError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
