const router = require("express").Router();
const registerUser = require("../controllers/register");

router.post("/register", registerUser);



module.exports = router;
