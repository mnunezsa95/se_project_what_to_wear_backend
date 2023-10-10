const router = require("express").Router();
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.get("/", getItems); // get items
router.post("/", validateClothingItem, auth, createItem); // create an item
router.delete("/:itemId", validateId, auth, deleteItem); // delete an item

module.exports = router;
