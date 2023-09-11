const router = require("express").Router();
const {registerAdmin, loginAdmin, logoutAdmin} = require('../controllers/admin');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;
