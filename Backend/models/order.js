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
        ref: "food",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  food : {
    type: String,
    required: true
  },
  price : {
    type: Number,
    required: true
  },
customerName :{
    type: String,
    required: [true, " Please Insert your name "]
},
phoneNumber: {
    type: Number,
    required: [10, " Phone number contain 10 digit number"]
},
address: {
    type: String,
    required: [true, " Please insert your location "]
},
status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "canceled"],
    default: "pending"
  },
createdDate: {
    type: Date,
    Default: Date.now
}
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
