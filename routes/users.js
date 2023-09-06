const router = require("express").Router(); // import and create the router
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
