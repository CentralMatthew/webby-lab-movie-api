const { ErrorHandler } = require('../errors/ErrorHandler');
const { userValidator } = require('../validators');
const statusCode = require('../constants/statusCodes');
const {
  INVALID_KEY_VALUE,
  NO_TOKEN,
  WRONG_TOKEN,
} = require('../errors/error-message');
const { jwtHelper } = require('../utils');

module.exports = {
  checkAuthToken: async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          NO_TOKEN.message,
          NO_TOKEN.code
        );
      }

      const token = authorizationHeader.split(' ')[1];

      const user = await jwtHelper.verifyToken(token);

      if (!user) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          WRONG_TOKEN.message,
          WRONG_TOKEN.code
        );
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },
};
