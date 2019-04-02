var express = require("express");
var router = express.Router();
var models = require("../models"); //<--- Add models
var authService = require("../services/auth"); //<--- Add authentication service

// Create new user if one doesn't exist
router.post("/signup", function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        username: req.body.username
      },
      defaults: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: authService.hashPassword(req.body.password) //<--- Change to this code here
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.json("User successfully created");
      } else {
        res.json("This user already exists");
      }
    });
});

// Login user and return JWT as cookie
router.post("/login", function(req, res, next) {
  models.users
    .findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        console.log("User not found");
        return res.status(401).json({
          message: "Login Failed"
        });
      } else {
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.password
        );
        if (passwordMatch) {
          console.log("logged in");
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.json("Login successful");
        } else {
          console.log("Wrong password");
          res.json("Wrong password");
        }
      }
    });
});

router.get("/profile", function(req, res, next) {
  console.log("profile");
  let token = req.cookies.jwt;
  console.log(token);
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        user.password = "";
        res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.json("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.json("Must be logged in");
  }
});

router.get("/logout", function(req, res, next) {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.json("Logged out");
});

router.get("/validateToken", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  } else {
    res.json(false);
  }
});

module.exports = router;
