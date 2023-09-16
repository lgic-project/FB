const router = require("express").Router();
const adminAuth = require("../middleware/adminAuth");
const {registerAdmin, loginAdmin, logoutAdmin, getAdminData} = require('../controllers/admin');
const {getUser, getUserById} = require("../controllers/user");

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post("/logout", logoutAdmin);

// get all user
router.get("/users", getUser);

//  get User By Id
router.get("/users/:userId", getUserById)

// Only logIn admin data can get
router.get("/data", adminAuth, getAdminData); 

module.exports = router;
