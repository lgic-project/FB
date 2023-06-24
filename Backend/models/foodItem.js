const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const food = mongoose.model("food", foodSchema);

module.exports = food;

