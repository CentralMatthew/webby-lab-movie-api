require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const { PORT } = require('./constants/port');
const { handleErrors, notFoundHandler } = require('./errors/ErrorHandler');
const { sequelize } = require('./config/database.config');
const { movieRouter, usersRouter, sessionRouter } = require('./routers');

const app = express();

sequelize.sync();

app.use(express.json());
app.use(fileUpload({}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/import', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/import.html'));
});

app.use(cookieParser());

app.use('/movies', movieRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);

app.use(notFoundHandler);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});

module.exports = app;
