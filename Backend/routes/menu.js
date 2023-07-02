const router = require("express").Router();
const {
  addFood,
  getFoods,
  updateFood,
  deleteFood
} = require("../controllers/menu");

router.post("/addFood", addFood);
router.get("/foods", getFoods);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;
