const mongoose = require('mongoose');
const db = 'mongodb+srv://nabinpoudel788:whathell2000@cluster0.fbhuoqq.mongodb.net/cluster0?retryWrites=true&w=majority';

mongoose.connect(db)
  .then(() => {
    console.log("Connection successful")
  })
  .catch((err) => {
    console.log("No connection:", err);
  });
