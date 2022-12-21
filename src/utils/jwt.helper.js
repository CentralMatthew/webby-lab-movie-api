const jwt = require('jsonwebtoken');
const {
  tokens: { ACCESS_TOKEN_SECRET, EXPIRES_FOR_ACCESS },
} = require('../constants');

module.exports = {
  generateToken: (userId, userName) =>
    jwt.sign({ userId, userName }, ACCESS_TOKEN_SECRET, {
      expiresIn: EXPIRES_FOR_ACCESS,
    }),

  verifyToken: (token) => jwt.verify(token, ACCESS_TOKEN_SECRET),
};
