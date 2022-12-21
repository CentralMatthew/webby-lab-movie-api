const { Movie, Actor } = require('../models');
const { statusCodes, successResults } = require('../constants');
const { movieHelper } = require('../utils');
const { searchQueryBuilder } = require('../utils/movies.helper');

const includeOptions = [
  {
    model: Actor,
    attributes: ['id', 'name'],
    through: {
      attributes: [],
    },
  },
];

module.exports = {
  getById: async (req, res, next) => {
    try {
      const { movie } = req;

      res.status(statusCodes.OK).json(movie);
    } catch (e) {
      next(e);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const {
        limit = 20,
        offset = 0,
        sort = 'id',
        order = 'ASC',
        ...searchParams
      } = req.query;

      const searchConditions = searchQueryBuilder(searchParams);

      const movies = await Movie.findAll({
        include: includeOptions,
        where: searchConditions,
        subQuery: false,
        limit,
        offset: offset * limit,
        order: [[sort, order]],
      });

      res.status(statusCodes.OK).json(movies);
    } catch (e) {
      next(e);
    }
  },

  importMovies: async (req, res, next) => {
    try {
      const moviesData = req.files.movies.data.toString();

      const newMovies = movieHelper.formatArrayOfMovieObjects(moviesData);

      const movies = await Movie.bulkCreate(newMovies, {
        include: includeOptions,
      });

      res.status(statusCodes.OK).json(movies);
    } catch (e) {
      next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      const { actors, ...movieData } = req.body;

      // const newActors = actors.map((name) => ({ name }));
      const arr = await Promise.all(
        actors.map(async (name) => {
          const [actor] = await Actor.findOrCreate({ where: { name } });

          return actor;
        })
      );

      const newMovie = await Movie.create(
        {
          ...movieData,
        },
        {
          include: includeOptions,
        }
      );

      await newMovie.addActors(arr);

      res.status(statusCodes.OK).json(newMovie);
    } catch (e) {
      next(e);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.movie;

      await Movie.destroy({ where: { id } });

      res.status(statusCodes.OK).json(successResults.SUCCESS_DELETE);
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const { movie } = req;
      const { actors, ...movieData } = req.body;

      await Movie.update(movieData, {
        where: {
          id: movie.id,
        },
      });

      if (actors) {
        const actorsArrayRecords = await Promise.all(
          actors.map(async (name) => {
            const [actor] = await Actor.findOrCreate({ where: { name } });

            return actor;
          })
        );

        await movie.setActors(actorsArrayRecords);
      }

      res.status(statusCodes.OK).json(successResults.SUCCESS_UPDATE);
    } catch (e) {
      next(e);
    }
  },
};
