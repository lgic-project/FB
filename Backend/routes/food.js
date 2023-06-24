const Food = require("../models/foodItem");
const router = require("express").Router();

// create food
router.post("/addFood", async (req, res) => {
  try {
    // Creating food
    const newFood = await Food.create(req.body);

    res.status(200).json({
      success: true,
      message: "food added sucessfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// read food
router.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// update food
router.put("/:id", async (req, res) => {
  try {
    let existingFood = await Food.findById(req.params.id);

    if (!existingFood)
      return res.status(404).json({
        success: false,
        message: "Food not found"
      });

    existingFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      food: existingFood
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete food
router.delete("/:id", async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Food deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
