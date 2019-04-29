const express = require('express');
const app = express();
// Keep the persistence layer outside of the routes and controllers to simplify testing
const db = require('./db/models');

require('./routes')(app, db);

module.exports = app;