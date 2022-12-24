const { Movie, Actor } = require('../models');
const { statusCodes, successResults } = require('../constants');
const { movieHelper } = require('../utils');
const { searchQueryBuilder } = require('../utils/movies.helper');
const { sequelize } = require('../config/database.config');

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

      const sortOption =
        sort === 'id' ? sort : sequelize.fn('lower', sequelize.col(sort));

      const movies = await Movie.findAll({
        include: [
          {
            model: Actor,
            attributes: [],
            through: {
              attributes: [],
            },
          },
        ],
        where: searchConditions,
        subQuery: false,
        group: 'title',
        limit,
        offset: offset * limit,
        order: [[sortOption, order]],
      });

      res.status(statusCodes.OK).json(movies);
    } catch (e) {
      next(e);
    }
  },

  importMovies: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const newMovies = movieHelper.formatArrayOfMovieObjects(req.moviesData);

      const movies = await Movie.bulkCreate(newMovies, {
        updateOnDuplicate: ['title'],
        include: [
          {
            model: Actor,
            updateOnDuplicate: ['movie_id', 'actor_id', 'name'],
          },
        ],
        transaction: t,
      });

      await t.commit();

      res.status(statusCodes.OK).json(movies);
    } catch (e) {
      await t.rollback();
      next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      const { actors, ...movieData } = req.body;

      const arrayOfActorModels = await Promise.all(
        actors.map(async (name) => {
          const [actor] = await Actor.findOrCreate({
            where: { name },
          });

          return actor;
        })
      );

      const newMovie = await Movie.create({
        ...movieData,
      });

      await newMovie.addActors(arrayOfActorModels);

      const result = await Movie.findOne({
        where: { title: newMovie.title },
        include: [
          {
            model: Actor,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
        ],
      });

      res.status(statusCodes.OK).json(result);
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
        returning: true,
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

      const result = await Movie.findOne({
        where: { id: movie.id },
        include: [
          {
            model: Actor,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
        ],
      });

      res.status(statusCodes.OK).json(result);
    } catch (e) {
      next(e);
    }
  },
};
