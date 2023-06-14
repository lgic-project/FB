const asyncHandler = require("express-async-handler"); // Importing the asyncHandler library to handle asynchronous route handlers
const bcrypt = require("bcrypt"); // Importing the bcrypt library for password hashing
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for handling JSON Web Tokens
const User = require("../models/userModel"); // Importing the User model

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body; // Extracting username, email, and password from the request body
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!"); // Handling missing fields error
  }
  const userAvailable = await User.findOne({ email }); // Checking if the user with the given email already exists
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!"); // Handling user already registered error
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password using bcrypt with a salt of 10 rounds
  console.log("Hashed Password: ", hashedPassword); // Logging the hashed password
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  }); // Creating a new user with the provided username, email, and hashed password

  console.log(`User created ${user}`); // Logging the created user
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email }); // Sending a JSON response with the created user's ID and email
  } else {
    res.status(400);
    throw new Error("User data is not valid"); // Handling invalid user data error
  }
  res.json({ message: "Register the user" }); // Sending a JSON response with a message (this line will not be reached)
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from the request body
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!"); // Handling missing fields error
  }
  const user = await User.findOne({ email }); // Finding the user with the provided email

  // Compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    ); // Generating an access token with the user's username, email, and id
    res.status(200).json({ accessToken }); // Sending a JSON response with the access token
  } else {
    res.status(401);
    throw new Error("Email or password is not valid"); // Handling invalid email or password error
  }
});

// Current user
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user); // Sending a JSON response with the current user retrieved from the request object
});

module.exports = { registerUser, loginUser, currentUser }; // Exporting the registerUser, loginUser, and currentUser functions for use in other files
