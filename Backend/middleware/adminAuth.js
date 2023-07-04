// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Please log in first.');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token.');
    }

    req.user = user;
    next();
  });
};

module.exports = adminAuth;
