const express = require('express');
const app = express();
// Keep the persistence layer outside of the routes and controllers to simplify testing
const db = require('./db/models');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_WHITELIST);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, DELETE');
  next();
});

require('./routes')(app, db);

module.exports = app;