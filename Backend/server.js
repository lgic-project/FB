require("./Database/dcConnection");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const { authenticateToken } = require("./middleware/auth");


const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
app.use(cookieParser());

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());

// user Routes
app.use("/api/users", registerRoutes, loginRoutes, logoutRoutes);

app.get("/home", authenticateToken, (req, res) => {
  res.send('Welcome to the home page!');
});

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
