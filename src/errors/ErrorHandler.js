const { UNKNOWN_ERROR, ROUTE_NOT_FOUND } = require('./error-message');
const statusCode = require('../constants/statusCodes');

class ErrorHandler extends Error {
  constructor(status, message, customCode) {
    super(message);
    this.message = message;
    this.status = status;
    this.code = customCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

function handleErrors(err, req, res, next) {
  res.status(err.status).json({
    message: err.message || UNKNOWN_ERROR,
    customCode: err.status || UNKNOWN_ERROR.code,
  });
}

function notFoundHandler(err, req, res, next) {
  next({
    status: err.status || statusCode.NOT_FOUND,
    message: err.message || ROUTE_NOT_FOUND.message,
  });
}

module.exports = { ErrorHandler, handleErrors, notFoundHandler };
