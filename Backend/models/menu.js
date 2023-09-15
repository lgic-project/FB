const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String, // Store image URLs as strings
      }],

    availability: {
        type: Boolean,
        required: true
    },
    
});

const food = mongoose.model("food", foodSchema);

module.exports = food;
