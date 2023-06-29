const router = require("express").Router();
const loginController = require("../controllers/login");


router.post("/login", loginController);



module.exports = router;
