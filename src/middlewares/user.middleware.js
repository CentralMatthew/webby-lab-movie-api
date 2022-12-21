const { User } = require('../models');
const { ErrorHandler } = require('../errors/ErrorHandler');
const statusCode = require('../constants/statusCodes');
const {
  EMAIL_IS_NOT_AVAILABLE,
  INVALID_KEY_VALUE,
  WRONG_EMAIL_OR_PASSWORD,
} = require('../errors/error-message');
const { userValidator } = require('../validators');

module.exports = {
  isEmailAvailable: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user) {
        throw new ErrorHandler(
          statusCode.CONFLICT,
          EMAIL_IS_NOT_AVAILABLE.message,
          EMAIL_IS_NOT_AVAILABLE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkUserValidity: (req, res, next) => {
    try {
      const { error } = userValidator.validateUserData.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          error.details[0].message,
          INVALID_KEY_VALUE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam:
    (paramName, searchIn = 'body', dbKey = paramName) =>
    async (req, res, next) => {
      try {
        const valueFromParams = req[searchIn][paramName];

        const user = await User.findOne({
          where: {
            [dbKey]: valueFromParams,
          },
        });

        if (!user) {
          throw new ErrorHandler(
            statusCode.FORBIDDEN,
            WRONG_EMAIL_OR_PASSWORD.message,
            WRONG_EMAIL_OR_PASSWORD.code
          );
        }

        req.user = user;

        next();
      } catch (e) {
        next(e);
      }
    },
};
