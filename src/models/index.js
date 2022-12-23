const Movie = require('./Movie.model');
const Actor = require('./Actor.model');
const User = require('./User.model');
const { ACTORS_MOVIES } = require('../constants/dbModelsEnum');

Movie.belongsToMany(Actor, {
  through: { model: ACTORS_MOVIES, unique: true },
  foreignKey: 'movie_id',
  constraints: false,
});
Actor.belongsToMany(Movie, {
  through: { model: ACTORS_MOVIES, unique: true },
  foreignKey: 'actor_id',
  constraints: false,
});

module.exports = {
  Movie,
  Actor,
  User,
};
