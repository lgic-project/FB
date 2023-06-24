require("./Database/dcConnection")
const registerRoutes = require("./routes/register")
const loginRoutes = require("./routes/login")
const foods = require("./routes/food")
const order = require("./routes/order")

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/", registerRoutes);
app.use("/api/", loginRoutes);
app.use("/api/food", foods)
app.use("/api/order", order)

app.listen(PORT, () => {
    console.log("serverlisten from port ",PORT);
})