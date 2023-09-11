const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please insert your name"]
  },
  email: {
    type: String,
    required: [true, "Please insert your email address"]
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters"]
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "365d"
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password")
  });
  return schema.validate(data);
};

module.exports = { User, validate };
