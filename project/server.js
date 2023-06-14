const mongoose = require("mongoose")
require("./mconfig/mdb")

require("dotenv").config();


const express = require("express")
const app = express()

const port = 2023

const bcrypt = require("bcrypt")

app.use(express.json());

app.use("users", require("./routes/userRoutes"))

app.listen(port,()=>{
    console.log("server lsiten from port", port);

    if (port == port) {
        console.log("database is connected");
    }
})
