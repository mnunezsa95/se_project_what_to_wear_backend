const ClothingItem = require("../models/clothingItem");
const { ForbiddenError } = require("../Errors/ForbiddenError");
const { BadRequestError } = require("../Errors/BadRequestError");
const { NotFoundError } = require("../Errors/NotFoundError");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => {
      next(new NotFoundError("not found"));
    });
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user);
  ClothingItem.create({ name, weather, imageUrl, owner: req.user })
    .then((item) => res.send(item))
    .catch(() => {
      next(new BadRequestError("invalid data"));
    });
};

module.exports.deleteItem = (req, res, next) => {
  console.log(req.params);
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("an item with specified id not found");
    })
    .then((item) => {
      if (item.owner.equals(req.user._id)) {
        return ClothingItem.findByIdAndRemove(itemId).then(() => {
          res.send({ message: "item deleted" });
        });
      }
      throw new ForbiddenError("cannot delete another user's post");
    })
    .catch((err) => {
      if (err.name === "NotFoundError") next(err);
      if (err.name === "ForbiddenError") next(err);
      next(new BadRequestError("invalid data"));
    });
};
