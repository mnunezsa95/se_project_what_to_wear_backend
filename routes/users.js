const router = require("express").Router(); // import and create the router
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateCurrentUser);

module.exports = router;
