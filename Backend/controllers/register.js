const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');

// Register user
const registerUser = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "user already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "user created successfully " });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
  
      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(401).send({ message: "Invalid email or password" });
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid email or password" });
  
      const token = user.generateAuthToken();
  
      // Set the authentication token as a cookie
      res.cookie("token", token, { httpOnly: true });
  
      res.status(200).send({ data: token, message: "LogIn successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server error" });
    }
  };

  const logoutUser = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.send('Logout successful.');
};

module.exports = { registerUser, loginUser, logoutUser };
