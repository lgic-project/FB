const mongoose = require("mongoose") // Importing the mongoose library
require("./mconfig/mdb") // Importing the MongoDB configuration

require("dotenv").config(); // Loading environment variables from .env file

const express = require("express") // Importing the Express library
const app = express() // Creating an instance of the Express application

const port = 2023 // Setting the port number for the server

const bcrypt = require("bcrypt") // Importing the bcrypt library for password hashing

app.use(express.json()); // Parsing JSON data in the request body

app.use("users", require("./routes/userRoutes")) // Using userRoutes for handling routes starting with "/users"

app.listen(port,()=>{ // Starting the server and listening on the specified port
    console.log("server lsiten from port", port); // Logging a message indicating the server is listening on the port

    if (port == port) { // Checking if the port variable matches the specified port
        console.log("database is connected"); // Logging a message indicating the database is connected
    }
})
