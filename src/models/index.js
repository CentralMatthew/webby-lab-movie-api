const Movie = require('./Movie.model');
const Actor = require('./Actor.model');
const User = require('./User.model');

Movie.belongsToMany(Actor, {
  through: { model: 'actors_movies', unique: true },
  constraints: false,
});
Actor.belongsToMany(Movie, {
  through: { model: 'actors_movies', unique: true },
  constraints: false,
});

module.exports = {
  Movie,
  Actor,
  User,
};
