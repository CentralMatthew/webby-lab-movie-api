const { ErrorHandler } = require('../errors/ErrorHandler');
const statusCode = require('../constants/statusCodes');
const { NO_TOKEN, WRONG_TOKEN } = require('../errors/error-message');
const { jwtHelper } = require('../utils');
const { TOKEN } = require('../constants/tokens');

module.exports = {
  checkAuthToken: async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      const tokenFromCookie = req.cookies.token;

      if (!authorizationHeader && !tokenFromCookie) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          NO_TOKEN.message,
          NO_TOKEN.code
        );
      }

      const token = tokenFromCookie || authorizationHeader.split(' ')[1];

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
      res.clearCookie(TOKEN);
    }
  },
};
