const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "canceled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
