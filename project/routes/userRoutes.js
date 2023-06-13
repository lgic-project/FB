const express = require("express");
const {registerUser, loginUser, currenttUser} = require("../controllers/userController");

const validateToken = require("../middleware/VTH");
const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/current", validateToken, currenttUser);

module.exports = router;
