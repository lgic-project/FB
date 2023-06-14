const mongoose = require("mongoose"); // Importing the mongoose library

const db = process.env.DB_DATABASE; // Getting the database connection string from environment variables
mongoose.connect(db); // Connecting to the MongoDB database using the connection string

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
}); // Creating a Mongoose schema for the User model with name, email, and password fields

const User = mongoose.model('project', userSchema); // Creating a User model based on the userSchema, and specifying the collection name as 'project'
module.exports = User; // Exporting the User model for use in other files
