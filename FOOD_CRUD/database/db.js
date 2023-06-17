const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://nabinpoudel788:whathell2000@cluster0.fbhuoqq.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
