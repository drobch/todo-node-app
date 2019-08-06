const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: 3600
    };
    console.log('token ', token);
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        res.status(500).json({ message: err.message, success: false })
      }
      else {
        console.log('decoded: ', decoded);
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(499).send({ message: 'Token required', success: false });
  }
}

module.exports = validateToken;