const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");
const {registerAdmin, loginAdmin, logoutAdmin, getAdminData} = require('../controllers/admin');
const {getUser} = require("../controllers/user");

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post("/logout", logoutAdmin);

// get all user
router.get("/users", getUser);

// Only logIn admin data can get
router.get("/data", adminAuth, getAdminData); 

module.exports = router;
