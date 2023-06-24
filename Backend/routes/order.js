const Order = require("../models/order")
const router = require("express").Router();

// Place a new order
router.post("/placeOrder", async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);

        res.status(200).json({
            success: true,
            message: "Order place sucessfully",
            order: newOrder
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});  

// Get details of a specific order
router.get("/:orderId", async (req, res) => {
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
});

// Get a list of orders for a user
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.query;
        let query = {};

        if (userId) {
            query.user = userId;
        }

        const orders = await Order.find(query);

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update order status
router.put("/status/:orderId", async (req, res) => {
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
            message: "status update sucessfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Cancel an order
router.delete("/cancel/:orderId", async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if (!order)
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        if (order.status !== "Pending")
            return res.status(400).json({
                success: false,
                message: "Order does not cancel due to confirmation of order "
            });

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        res.status(200).json({
            success: true,
            message: "Order canceled successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
