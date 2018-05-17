const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // lecture #12
const keys = require("../../config/keys"); // lecture #12
const passport = require("passport"); // lecture #13
// Load input validation
const validateRegisterInput = require("../../validation/register"); // lecture #14
const validateLoginInput = require("../../validation/login"); // lecture #15
// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => res.json({
  msg: "users works"
}));

// first validation -- lecture #14 -----
// @route   GET api/users/register
// @desc    Test users route
// @access  Public
router.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  // End of first validation -- lecture #14 --

  // looking for a record that has an email that users trying to register with. We need to add body-parser
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = "email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login User / Returning JWT Token
// @access Public

router.post("/login", (req, res) => {
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({
        email: "user not found"
      });
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }; // Create JWT Payload with certain information (id, name, avatar)

        // Sign Token by passing the payload
        jwt.sign(
          payload,
          keys.secretOrKey, {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        ); // expiration time of the token/authentication

        //res.json({ msg: "success" });
      } else {
        return res.status(400).json({
          password: "Password incorrect"
        });
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;