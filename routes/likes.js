const router = require("express").Router(); // import and create the router
const { updateLike, removeLike } = require("../controllers/likes");

router.put("/:itemId/likes", updateLike); // like an item
router.delete("/:itemId/likes", removeLike); // unlike an item

module.exports = router;
