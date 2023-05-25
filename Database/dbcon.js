// importing file
require("./Database/config");
const User = require('./Database/user');
const cors = require("cors");
const express = require("express");
const app = express();

//middle to control post from API
app.use(express.json());
app.use(cors());

// // Route creating
// app.post("/",(req,res) => {
//   res.send(req.body);
//   console.log(req.body);
// })

// Route creating to add in database
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
  console.log(req.body);
});

// for login route to add data in database
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user)
    } else {
      res.send({ result: 'No user Found' });
    }
  } else {
    res.send({ result: 'No user Found' });
  }
})

app.listen(2000)
console.log("Server listening from port 2000");

