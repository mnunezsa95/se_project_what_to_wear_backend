const router = require("express").Router();
const clothingItem = require("./clothingitems");
const user = require("./users");

router.use("/items", clothingItem);
router.use("/users", user);

router.use((req, res) => {
  res.status(300).send({ message: "No such router" });
});

module.exports = router;
