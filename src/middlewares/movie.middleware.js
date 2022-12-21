const { Movie, Actor } = require('../models');
const { ErrorHandler } = require('../errors/ErrorHandler');
const statusCode = require('../constants/statusCodes');
const {
  MOVIE_IS_ALREADY_EXIST,
  INVALID_KEY_VALUE,
  MOVIE_NOT_FOUND,
} = require('../errors/error-message');
const { movieValidator } = require('../validators');

module.exports = {
  checkIsMovieUnique: async (req, res, next) => {
    try {
      const { title } = req.body;
      const movie = await Movie.findOne({ where: { title } });

      if (movie) {
        throw new ErrorHandler(
          statusCode.CONFLICT,
          MOVIE_IS_ALREADY_EXIST.message,
          MOVIE_IS_ALREADY_EXIST.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsMovieExist: async (req, res, next) => {
    try {
      const { movieId } = req.params;

      const movie = await Movie.findOne({
        where: {
          id: movieId,
        },
        include: [
          {
            model: Actor,
            attributes: ['id', 'name'],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!movie) {
        throw new ErrorHandler(
          statusCode.NOT_FOUND,
          MOVIE_NOT_FOUND.message,
          MOVIE_NOT_FOUND.code
        );
      }

      req.movie = movie;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkMovieValidity: (req, res, next) => {
    try {
      const { error } = movieValidator.validateMovie.validate(req.body);

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
};
