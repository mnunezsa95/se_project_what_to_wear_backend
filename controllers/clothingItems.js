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
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(ERROR_403)
          .send({ message: "cannot delete another user's post" });
      }
      ClothingItem.findByIdAndDelete(item._id)
        .orFail()
        .then(() => {
          res.status(200).send({ message: "item deleted" });
        })
        .catch((err) => {
          logError(err);
          handleAllErrors(err, res);
        });
    })
    .catch((err) => {
      logError(err);
      handleAllErrors(err, res);
    });
};
