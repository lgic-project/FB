const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");
const {registerAdmin, loginAdmin, logoutAdmin, getAdminData} = require('../controllers/admin');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post("/logout", logoutAdmin);

// Only logIn admin data can get
router.get("/data", adminAuth, getAdminData); 

module.exports = router;
