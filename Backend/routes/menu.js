const router = require("express").Router();
const {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood
} = require("../controllers/menu");

router.post("/addFood", addFood);
router.get("/foods", getFoods);
router.get("/:id", getFoodByID);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;
