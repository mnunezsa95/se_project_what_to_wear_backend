const ClothingItem = require("../models/clothingItem");

module.exports.getItems = (req, res) => {
  console.log(req);
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch();
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((itemData) => res.status(200).send({ itemData }))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error" });
    });
};

// module.exports.updateItem = (req, res) => {};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.id)
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: "Error" });
    });
};
