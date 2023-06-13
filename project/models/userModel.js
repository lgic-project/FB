const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Insert user name "],
    },
    email: {

        type: String,
        reqired: [true, "Insert user email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add password"],
    },
},
    {
        timesstamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);