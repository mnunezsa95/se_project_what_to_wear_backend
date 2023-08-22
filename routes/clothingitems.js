const router = require("express").Router(); // import and create the router
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems); // get items
router.post("/", createItem); // create an item
router.delete("/:itemId", deleteItem); // delete an item

module.exports = router;
