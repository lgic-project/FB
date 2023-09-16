const router = require("express").Router();
const {authenticateToken} = require("../middleware/userAuth");
const {registerUser, loginUser, logoutUser, getFoodByUser, getUserInfo} = require("../controllers/user");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// user get food 
router.get("/food", getFoodByUser);

// user get there information
router.get("/Info",authenticateToken, getUserInfo);


module.exports = router;
