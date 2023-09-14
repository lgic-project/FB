const Food = require("../models/menu");
const upload = require("../middleware/multer");

const addFood = async (req, res) => {
  try {

    // using multer
    upload.single('image')(req,res,async function (err) {
      if (err) {
        return res.status(400).json({ error: 'Sorry, failed to upload Image', message: err.message});
      }

        // Create a new food document with image file path
        const newFood = await Food.create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          availability: req.body.availability,
          imagePath: req.file.path, // Save the image file path in the database
        });
        
    res.status(200).json({
      success: true, newFood,
      message: "food added successfully"
    });
  });
  } catch (error) {
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
