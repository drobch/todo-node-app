const express = require('express');
// const { check, validationResult } = require('express-validator');
const validateToken = require('../handler');
const User = require('../models/user');

const router = express.Router();

router.get('/user', validateToken, (req, res) => {
  User.findOne({
    email: req.decoded.email
  })
    .then(user => {
      if (user) {
        return res.status(200).json({
          user: user,
          success: true
        });
      }
      else {
        return res.status(401).json({
          success: false,
          message: 'User was not found'
        });
      }
    })
    .catch(e => {
      return res.status(500).json({
        success: false,
        message: e.message
      })
    })
});

module.exports = router;