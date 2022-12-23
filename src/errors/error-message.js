module.exports = {
  UNKNOWN_ERROR: {
    message: 'Unknown error',
    code: 0,
  },

  EMAIL_IS_NOT_AVAILABLE: {
    message: 'User with this email is already registered',
    code: '400.1',
  },

  MOVIE_IS_ALREADY_EXIST: {
    message: 'Movie with this name is already exist',
    code: '400.2',
  },

  INVALID_KEY_VALUE: {
    message: 'Invalid key value',
    code: '400.3',
  },

  FILE_IS_EMPTY: {
    message: 'File is empty',
    code: '400.4',
  },

  NO_TOKEN: {
    message: 'No token',
    code: '401.1',
  },

  WRONG_TOKEN: {
    message: 'Wrong token',
    code: '401.2',
  },

  WRONG_EMAIL_OR_PASSWORD: {
    message: 'Wrong email or password',
    code: '403.1',
  },

  ROUTE_NOT_FOUND: {
    message: 'Route not found',
    code: '404.1',
  },

  USER_NOT_FOUND: {
    message: 'User not found',
    code: '404.2',
  },

  MOVIE_NOT_FOUND: {
    message: 'Movie not found',
    code: '404.3',
  },

  WRONG_FILE_FORMAT: {
    message: 'Wrong file format. File must have .txt extensions',
    code: '415.1',
  },
};
