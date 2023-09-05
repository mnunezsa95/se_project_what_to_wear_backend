const ClothingItem = require("../models/clothingItem");
const { logError, handleAllErrors } = require("../utils/handleErrors");
const { ERROR_403 } = require("../utils/errors");

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
      if (item.owner.equals(req.user._id)) {
        console.log(req.user._id);
        console.log(item.owner);
        return ClothingItem.findByIdAndRemove(itemId).then(() => {
          res.send({ message: "item deleted" });
        });
      }
      return res
        .status(ERROR_403)
        .send({ message: "cannot delete another user's post" });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};
