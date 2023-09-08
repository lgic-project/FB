const router = require("express").Router();
const {placeOrder,getOrder,getOrderById,getOrdersByUser,updateOrderStatus,cancelOrder}= require("../controllers/order");

// Place a new order
router.post("/placeOrder", placeOrder)

// Get the list of all order
router.get("/orderList", getOrder)

// Get details of a specific order
router.get("/:orderId", getOrderById)

// Get a list of orders for a user
router.get("/user/:userId", getOrdersByUser)

// Update order status
router.put("/status/:orderId", updateOrderStatus)

// Cancel an order
router.delete("/cancel/:orderId", cancelOrder)

module.exports = router;
