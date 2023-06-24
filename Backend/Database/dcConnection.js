const mongoose = require("mongoose")
require("dotenv").config();

mongoose.connect(process.env.DBCON)
    .then(() => console.log("Database connected sucessfully"))
    .catch((e) => console.log(e))