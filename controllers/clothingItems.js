const ClothingItem = require("../models/clothingItem");
const { IdNotFoundError } = require("../utils/IdNotFoundErrorClass");

// import functions for handling errors
const { logError, handleAllErrors } = require("../utils/handleErrors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ data: items }))
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user);
  ClothingItem.create({ name, weather, imageUrl, owner: req.user })
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner === req.user._id) {
        res
          .status(403)
          .send({ message: "forbidden: cannot delete another user's post" });
      }
      return ClothingItem.findByIdAndRemove(itemId)
        .orFail(() => {
          const idNotFoundError = new IdNotFoundError();
          throw idNotFoundError;
        })
        .then(() => res.send({ message: "item deleted" }));
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};
