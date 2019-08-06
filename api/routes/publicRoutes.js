const express = require('express');
const User = require('../models/user');
const router = express.Router();

// const { check, validationResult } = require('express-validator');

router.post('/signup', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        return res.status(400).json({
          message: 'Email already exists',
          isCreated: false
        });
      }
      else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });
        
        newUser
          .save((err, user) => {
            if (err) {
              return res.status(400).json({
                message: 'User was not signed up',
                isCreated: false
              });
            }
            if (user) {
              return res.status(200).json({
                message: 'User was signed up',
                isCreated: true
              });
            }
            else {
              return res.status(400).json({
                message: 'Could not sign up',
                isCreated: false
              });
            }
          });
      }
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.authenticate(email, password, (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: err.message
      });
    }
    if (result) {
      return res
        .header('Authorization', `Bearer ${result.token}`)
        .json({
          success: true,
          token: `Bearer ${result.token}`,
          user: result.user
        });
    }
    else {
      return res.status(500).json({
        success: false,
        message: 'Error occurred'
      })
    }
  });
});

router.get('/main', function (req, res) {
  return res.send('test');
});

module.exports = router;