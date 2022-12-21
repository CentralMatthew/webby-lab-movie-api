const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.config');
const { MOVIES } = require('../constants/dbModelsEnum');
const { VHS, DVD, BLU_RAY } = require('../constants/videoFormatsEnum');

const Movie = sequelize.define(
  MOVIES,
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    format: {
      type: DataTypes.ENUM,
      values: [VHS, DVD, BLU_RAY],
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['title'],
      },
    ],
  }
);

module.exports = Movie;
