const router = require("express").Router();
const {registerUser, loginUser, logoutUser, getFoodByUser} = require("../controllers/user");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/food", getFoodByUser)

module.exports = router;
