const router = require("express").Router();
const { updateLike, removeLike } = require("../controllers/likes");
const { validateId } = require("../middlewares/validation");

router.put("/:itemId/likes", validateId, updateLike);
router.delete("/:itemId/likes", validateId, removeLike);

module.exports = router;
