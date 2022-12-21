const Movie = require('./Movie.model');
const Actor = require('./Actor.model');
const User = require('./User.model');

Movie.belongsToMany(Actor, { through: 'actors_movies' });
Actor.belongsToMany(Movie, { through: 'actors_movies' });

module.exports = {
  Movie,
  Actor,
  User,
};
