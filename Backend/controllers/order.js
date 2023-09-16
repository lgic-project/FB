const Order = require("../models/order");

const placeOrder = async (req, res) => {
  try {
    const orderData = req.body;

    // Create an array of items
    const items = orderData.items.map((item) => ({
      foodItem: item.foodItem,
      foodName: item.foodName,
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrder = await Order.create({
      user: orderData.user,
      items: items,
      customerName: orderData.customerName,
      phoneNumber: orderData.phoneNumber,
      address: orderData.address,
      status: orderData.status, 
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrder = async (req,res) => {
  try {
    const order = await Order.find();
    res.status(200).json({
      sucess: true, order
    });
  } catch (error) {
    res.staus(500).json({
      error: "internal Server error"
    })
  }
}

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let query = {};

    if (userId) {
      query.user = userId;
    }

    const orders = await Order.find(query);

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    res.status(200).json({
      success: true,
      order: updatedOrder,
      message: "Status updated successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    if (order.status !== "pending")
      return res.status(400).json({
        success: false,
        message: "Order cannot be canceled due to order confirmation"
      });

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: "Order canceled successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  placeOrder,
  getOrder,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  cancelOrder
};
