const router = require("express").Router(); // import and create the router
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const { auth } = require("../middlewares/auth");

router.get("/", getItems); // get items
router.post("/", auth, createItem); // create an item
router.delete("/:itemId", auth, deleteItem); // delete an item

module.exports = router;
