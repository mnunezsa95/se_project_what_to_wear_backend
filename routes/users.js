const router = require("express").Router(); // import and create the router
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
