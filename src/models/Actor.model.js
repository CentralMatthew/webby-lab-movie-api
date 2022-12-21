const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.config');
const { ACTORS } = require('../constants/dbModelsEnum');

const Actor = sequelize.define(
  ACTORS,
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  }
);
module.exports = Actor;
