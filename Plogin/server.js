require("dotenv").config();
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const express = require("express");
const app = express();

// Define the static file directory
app.use(express.static('views'));

const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nabinpoudel788@gmail.com',
    pass: 'siwan@',
  },
});



// Routes
app.get('/', (req, res) => {
  res.render("index.ejs");
});

app.get('/index2', checkAuthenticated, (req, res) => {
  res.render("index2.ejs");
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get('/reset-password', checkNotAuthenticated, (req, res) => {
  res.render('reset.ejs', { resetOption: 'otp', message: req.flash('message') });
});

app.post('/reset-password', checkNotAuthenticated, (req, res) => {
  const { email } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    req.flash('message', 'Incorrect email');
    return res.redirect('/reset-password');
  }

  const verificationCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

  const mailOptions = {
    from: 'nabinpoudel788@gmail.com',
    to: email,
    subject: 'Password Reset Verification Code',
    text: `Your verification code is: ${verificationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('message', 'Failed to send verification code');
      return res.redirect('/reset-password');
    } else {
      console.log('Email sent: ' + info.response);
      req.session.resetEmail = email;
      req.session.resetVerificationCode = verificationCode;
      res.redirect('/verification');
    }
  });
});


app.post('/verification', checkNotAuthenticated, async (req, res) => {
  const { verificationCode, newPassword } = req.body;
  const email = req.session.resetEmail;
  const savedVerificationCode = req.session.resetVerificationCode;

  if (verificationCode === savedVerificationCode) {
    const user = users.find(user => user.email === email);
    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      req.session.resetEmail = null;
      req.session.resetVerificationCode = null;
      res.redirect('/login'); // Redirect to login page after successful password reset
    } else {
      req.flash('message', 'Invalid email');
      res.redirect('/verification');
    }
  } else {
    req.flash('message', 'Invalid verification code');
    res.redirect('/verification');
  }
});


app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
  successRedirect: "/index2",
  failureRedirect: "/login",
  failureFlash: true
}));

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(users); // Display newly registered in the console
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("/");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

app.listen(2023, "127.0.0.1", () => {
  console.log("Server started on port 2020");
});
