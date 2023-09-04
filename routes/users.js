const router = require("express").Router(); // import and create the router
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateCurrentUser);

module.exports = router;
