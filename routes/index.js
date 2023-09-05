const router = require("express").Router();
const clothingItem = require("./clothingitems");
const user = require("./users");
const like = require("./likes");
const { ERROR_404 } = require("../utils/errors");
const { auth } = require("../middlewares/auth");

router.use("/items", clothingItem);
router.use("/users", auth, user);
router.use("/items", auth, like);

router.use((req, res) => {
  res
    .status(ERROR_404)
    .send({ message: "There is no such router. Try a valid URI." });
});

module.exports = router;
