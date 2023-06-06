const express = require("express");
const app = express();

app.use(express.static('views'));
app.set('view engine', 'ejs');

// Render index.ejs for the root URL
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/order", (req, res) => {
    res.render("order.ejs");
});

app.listen(1001, () => {
    console.log("Server is running on port 1001");
});







