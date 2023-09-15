const router = require("express").Router();
const {placeOrder}= require("../controllers/order");


// place order 
router.post("/add", placeOrder);

module.exports = router