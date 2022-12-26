const { Op } = require('sequelize');

module.exports = {
  formatArrayOfMovieObjects: (movieData) => {
    const arrayOfMovies = movieData
      .split('\n\n')
      .map((el) => el.split('\n'))
      .filter((el) => el.length > 1);

    return arrayOfMovies
      .map((el) => el.map((movie) => movie.split(': ')[1]))
      .map(([title, year, format, actorsString]) => ({
        title,
        year,
        format,
        actors: actorsString.split(', ').map((name) => ({ name })),
      }))
      .filter(
        (value, index, self) =>
          self.findIndex((movie) => movie.title === value.title) === index
      );
  },

  searchQueryBuilder: (searchParams) => {
    let whereConditions = {};

    if (searchParams.search) {
      whereConditions = {
        ...whereConditions,
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${searchParams.search}%`,
            },
          },
          {
            '$actors.name$': {
              [Op.like]: `%${searchParams.search}%`,
            },
          },
        ],
      };
    }

    if (searchParams.title) {
      whereConditions = {
        ...whereConditions,
        title: {
          [Op.like]: `%${searchParams.title}%`,
        },
      };
    }

    if (searchParams.actor) {
      whereConditions = {
        ...whereConditions,
        '$actors.name$': {
          [Op.like]: `%${searchParams.actor}%`,
        },
      };
    }

    return whereConditions;
  },

  sortComparer: (a, b) => a.title.localeCompare(b.title),
};
