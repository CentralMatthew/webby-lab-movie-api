const { TXT } = require('../constants/fileExtensions');
const { ErrorHandler } = require('../errors/ErrorHandler');
const statusCode = require('../constants/statusCodes');
const { WRONG_FILE_FORMAT, FILE_IS_EMPTY } = require('../errors/error-message');

module.exports = {
  isValidFileExtension: (req, res, next) => {
    try {
      const file = req.files.movies;
      const fileName = file.name.split('.').pop();

      if (fileName !== TXT) {
        throw new ErrorHandler(
          statusCode.UNSUPPORTED_MEDIA,
          WRONG_FILE_FORMAT.message,
          WRONG_FILE_FORMAT.code
        );
      }

      req.file = file;
      next();
    } catch (e) {
      next(e);
    }
  },

  isFileNotEmpty: (req, res, next) => {
    try {
      const moviesData = req.file.data.toString();

      if (!moviesData.length) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          FILE_IS_EMPTY.message,
          FILE_IS_EMPTY.code
        );
      }

      req.moviesData = moviesData;

      next();
    } catch (e) {
      next(e);
    }
  },
};
