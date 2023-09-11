require("./Database/dcConnection");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const { authenticateToken } = require("./middleware/userAuth");
const adminRoutes = require('./routes/admin');
const adminAuth = require("./middleware/adminAuth");
const foods = require("./routes/menu");
const order = require("./routes/order");


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
app.use("/api/users", userRoutes);

app.get("/home", authenticateToken, (req, res) => {
  res.send('Welcome to the home page!');
});

// cart routes
app.use("/api/user/cart", authenticateToken, cartRoutes);


// admin routes
app.use('/api/admin', adminRoutes);


// menu routes
app.use("/api/admin/foods", adminAuth, foods);

// order routes
app.use("/api/admin/order",  adminAuth, order);

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});

