const bcrypt = require('bcrypt');
const {Admin, validate} = require('../models/admin');

// Register admin
const registerAdmin = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const admin = await Admin.findOne({ email: req.body.email });
        if (admin)
            return res.status(409).send({ message: "admin already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Admin({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "admin created successfully " });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const loginAdmin = async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error)
        return res.status(400).send({ message: error.details[0].message });
  
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin)
        return res.status(401).send({ message: "Invalid email or password" });
  
      const validPassword = await bcrypt.compare(
        req.body.password,
        admin.password
      );
      if (!validPassword)
        return res.status(401).send({ message: "Invalid email or password" });
  
      const token = admin.generateAuthToken();
  
      // Set the authentication token as a cookie
      res.cookie("token", token, { httpOnly: true });
  
      res.status(200).send({ data: token, message: "LogIn successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server error" });
    }
  };

  const getAdminData = async (req, res) => {
    try {
        // access the logged in admin data from req.user
        const admin = await Admin.findById(req.user._id);

        if (!admin) {
            return res.status(404).send({ message: "Admin not found" });
        }

        const adminData = {
            adminname: admin.adminname,
            email: admin.email,
            password: admin.password
        };

        res.status(200).send({ data: adminData, message: "Admin data display successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server error" });
    }
};

  const logoutAdmin = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.send('Logout successful.');
};

module.exports = { registerAdmin, loginAdmin, logoutAdmin, getAdminData };
