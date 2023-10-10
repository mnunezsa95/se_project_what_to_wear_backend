const router = require("express").Router();
const clothingItem = require("./clothingitems");
const user = require("./users");
const like = require("./likes");
const { auth } = require("../middlewares/auth");
const { NotFoundError } = require("../Errors/NotFoundError");

router.use("/items", clothingItem);
router.use("/users", auth, user);
router.use("/items", auth, like);

router.use(() => {
  throw new NotFoundError("There is no such router. Try a valid URI.");
});

module.exports = router;
