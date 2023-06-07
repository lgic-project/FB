require("dotenv").config();
const express = require("express");
const app = express();

// Define the static file directory
app.use(express.static("views"));

const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const users = [];

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    next();
  });
  

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/home");
    }
    next();
  }
// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/home", checkAuthenticated, (req, res) => {
  res.render("home1.ejs");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.get("/reset-password", checkNotAuthenticated, (req, res) => {
  res.render("reset.ejs", { message: req.flash("message") });
});

app.post("/reset-password", checkNotAuthenticated, (req, res) => {
  const { email } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    req.flash("message", "Incorrect email");
    return res.redirect("/reset-password");
  }

})



app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
  successRedirect: "/home",
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
      password: hashedPassword
    });
    console.log(users); // Display newly registered in the console
    res.redirect("/login");
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
    req.logout(function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
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
  console.log("Server started on port 2023");
});
