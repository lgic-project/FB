const asyncHandler = require("express-async-handler"); // Importing the asyncHandler library to handle asynchronous route handlers
const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library for handling JSON Web Tokens

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization; // Extracting the Authorization header from the request

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extracting the token from the Authorization header
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized"); // Handling unauthorized user error
            }
            req.user = decoded.user; // Assigning the decoded user object to the request object
            next();
        });
    }

    if (!token) {
        res.status(401);
        throw new Error("User is not authorized or token is missing"); // Handling unauthorized user or missing token error
    }
});

module.exports = validateToken; // Exporting the validateToken middleware for use in other files
