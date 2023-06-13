const mongoose = require("mongoose");


const db = 'mongodb+srv://nabinpoudel788:whathell2000@cluster0.fbhuoqq.mongodb.net/cluster0?retryWrites=true&w=majority';
mongoose.connect(db);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('project', userSchema);
module.exports = User;
