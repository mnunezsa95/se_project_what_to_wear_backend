const ClothingItem = require("../models/clothingItem");
const { IdNotFoundError } = require("../utils/errors");

// import functions for handling errors
const {
  logError,
  handleValidationErrors,
  handleNotFoundErrors,
  handleServerError,
} = require("../utils/handleErrors");

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
  console.log(res);
};

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user);
  ClothingItem.create({ name, weather, imageUrl, owner: req.user })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .orFail(() => {
      const idNotFoundError = new IdNotFoundError();
      throw idNotFoundError;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      logError(err);
      handleValidationErrors(err, res);
      handleNotFoundErrors(err, res);
      handleServerError(err, res);
    });
};
