const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.config');
const { USERS } = require('../constants/dbModelsEnum');

const User = sequelize.define(USERS, {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
