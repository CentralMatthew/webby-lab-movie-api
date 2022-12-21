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

  NO_TOKEN: {
    message: 'No token',
    code: '401.1',
  },

  WRONG_TOKEN: {
    message: 'Wrong token',
    code: '401.2',
  },

  WRONG_TEMPLATE: {
    message: 'Wrong template',
    code: '401.3',
  },

  EMAIL_NOT_VERIFIED: {
    message: 'Email not verified',
    code: '401.4',
  },

  WRONG_EMAIL_OR_PASSWORD: {
    message: 'Wrong email or password',
    code: '403.1',
  },

  ONLY_ONE_AVATAR_FOR_USER: {
    message: 'User can have only one avatar',
    code: '403.2',
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

  FILESIZE_TOO_BIG: {
    message: 'File size too big',
    code: '413.1',
  },

  WRONG_FILE_FORMAT: {
    message: 'Wrong file format',
    code: '415.1',
  },
};
