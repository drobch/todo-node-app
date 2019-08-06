const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        return callback({ message: 'User was not found', status: 401 });
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return callback({ message: err.message, status: 401 });
        }
        if (result) {
          const payload = { email: user.email };
          const token = jwt.sign(payload, config.secret, { expiresIn: 3600 });
          return callback(null, { token, user: user.email });
        } else {
          return callback({ message: 'Wrong password', status: 401 });
        }
      });
    });
};

UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User', UserSchema);
module.exports = User;