const router = require("express").Router();
const clothingItem = require("./clothingitems");
const user = require("./users");
const like = require("./likes");

router.use("/items", clothingItem);
router.use("/users", user);
router.use("/items", like);

router.use((req, res) => {
  res.status(300).send({ message: "No such router" });
});

module.exports = router;
