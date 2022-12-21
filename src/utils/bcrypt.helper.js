const bcrypt = require('bcrypt');
const { WRONG_EMAIL_OR_PASSWORD } = require('../errors/error-message');
const statusCode = require('../constants/statusCodes');
const { ErrorHandler } = require('../errors/ErrorHandler');

module.exports = {
  compare: async (hashedPassword, password) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatched) {
      throw new ErrorHandler(
        statusCode.FORBIDDEN,
        WRONG_EMAIL_OR_PASSWORD.message,
        WRONG_EMAIL_OR_PASSWORD.code
      );
    }
  },

  hash: (password) => bcrypt.hash(password, 10),
};
