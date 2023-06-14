const mongoose = require("mongoose");


const db = process.env.DB_DATABASE;
mongoose.connect(db);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('project', userSchema);
module.exports = User;
