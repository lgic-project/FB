const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true,
      },
      foodName: {
        type: String, // Assuming foodName is a string
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  customerName: {
    type: String,
    required: [true, "Please Insert your name"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number must contain 10 digits"],
  },
  address: {
    type: String,
    required: [true, "Please insert your location"],
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "canceled"],
    default: "pending",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
