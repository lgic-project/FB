const Food = require("../models/menu");
const upload = require("../middleware/multer");


const path = require("path");

const addFood = async (req, res) => {
  try {
    // multer for multiple image uploads
    upload.array('images', 3)(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: 'Sorry, failed to upload images', message: err.message });
      }

      // Create a new food document with image URLs
      // const imageUrls = req.files.map(file => file.path);
      const imageUrls = req.files.map(file => path.basename(file.path));

      const newFood = await Food.create({
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description,
        price: req.body.price,

        // Save the image URLs in the database
        images: imageUrls,

        // Set availability to true for user access
        availability: true, 
      });

      // Check if the food item and images are saved
      if (newFood) {
        console.log("Food and images saved successfully:", newFood);
        res.status(200).json({
          success: true,
          newFood,
          message: "Food added successfully"
        });
      } else {
        console.error("Failed to save food and images.");
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json({ success: true, foods });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFoodById = async (req,res) => {
  try {
    const foods = await Food.findById(req.params.id);
    if(!foods)
    return res.status(404).json({
  success: false,
  message: "food not found"});

  res.status(200).json({
    success: true,
    foods
  });
  } catch (error){
    res.status(500).json({ error: "Internal server error"});
  }
};

const updateFood = async (req, res) => {
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
};

const deleteFood = async (req, res) => {
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
};

module.exports = {
  addFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood
};
