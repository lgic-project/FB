const Product = require("./database/db")

const express = require("express")
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

const port = process.env.PORT || 2057

// creating Api
app.post("/api/product/new", async (req, res) => {

    //creating product
    const product = await Product.create(req.body);

    res.status(200).json({
        sucess: true,
        product
    })
})

// read product
app.get("/api/products", async (req, res) => {
    const products = await Product.find();

    res.status(200).json({ sucess: true, products })
})

// update product
app.put("/api/product/:id", async (req, res) => {
    let product = await Product.findById(req.params.id)

    if(!product)
    return res.status(404).json({
        sucess:false,
        message:"Product not found"
    })

    product = await Product.findByIdAndUpdate(req.params.id,
        req.body,
        {
            new: true, useFindAndModify: false,
            runalidators: true
        })
        res.status(200).json({
            sucess:true,
            product
        })
})

// Delete product
app.delete("/api/product/:id",async(req,res) =>{

    const product = await Product.findByIdAndDelete(req.params.id)

    if(!product){
    return res.status(404).json({
        sucess:false,
        message:"Product not found"
    })
}


    res.status(200).json({
        sucess:true,
        message:"Product Deleted Sucessfully"
    })
})


app.listen(port, () => {
    console.log("server listen from port:", port);
})