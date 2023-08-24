const router = require("express").Router();
const clothingItem = require("./clothingitems");
const user = require("./users");
const like = require("./likes");
const { notFoundErrorCODE } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);
router.use("/items", like);

router.use((req, res) => {
  res
    .status(notFoundErrorCODE)
    .send({ message: "There is no such router. Try a valid URI." });
});

module.exports = router;
