const express = require("express"); // Importing the express library
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userController"); // Importing the userController module and extracting the registerUser, currentUser, and loginUser functions
const validateToken = require("../middleware/VTH"); // Importing the validateToken middleware

const router = express.Router(); // Creating a router instance

router.post("/register", registerUser); // Register route, calling the registerUser function when a POST request is made to "/register"

router.post("/login", loginUser); // Login route, calling the loginUser function when a POST request is made to "/login"

router.get("/current", validateToken, currentUser); // Current user route, calling the validateToken middleware first, then calling the currentUser function when a GET request is made to "/current"

module.exports = router; // Exporting the router for use in other files
