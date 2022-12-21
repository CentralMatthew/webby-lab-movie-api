const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('app', '', '', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log,
  transactionType: 'IMMEDIATE',
});

module.exports = { sequelize };
