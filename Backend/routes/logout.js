const router = require("express").Router();

const logoutController = require("../controllers/logout");


router.post("/logout", logoutController);


module.exports = router;
