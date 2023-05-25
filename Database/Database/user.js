const mongoose = require("mongoose");

//creating schema 
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

//creating model
const User = mongoose.model('signup', userSchema);
module.exports = User;