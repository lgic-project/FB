const mongoose = require("mongoose"); // Importing the mongoose library

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"], // Field validation for username, it is required
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"], // Field validation for email, it is required
      unique: [true, "Email address already taken"], // Field validation for email, it should be unique
    },
    password: {
      type: String,
      required: [true, "Please add the user password"], // Field validation for password, it is required
    },
  },
  {
    timestamps: true, // Adding timestamps to the userSchema (createdAt and updatedAt fields)
  }
);

module.exports = mongoose.model("User", userSchema); // Creating and exporting a User model based on the userSchema
