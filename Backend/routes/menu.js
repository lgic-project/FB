const router = require("express").Router();
const adminAuth = require("../middelware/adminAuth");
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood
} = require("../controllers/menu");

router.post("/addFood",adminAuth, addFood);
router.get("/foods", getFoods);
router.get("/:id", getFoodByID);
router.put("/:id",adminAuth, updateFood);
router.delete("/:id",adminAuth, deleteFood);

module.exports = router;
