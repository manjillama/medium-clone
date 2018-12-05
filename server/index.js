'use strict';

const express = require('express');
const path = require('path');
const sequelize = require('./app/config/dbConnection.js');
const favicon = require('serve-favicon')
const router = require('./app/router');
const bodyParser = require('body-parser');
const createDDL = require('./app/config/createDDL');
const createRelationships = require('./app/config/createRelationships');
var cors = require('cors');

const config = require('./app/config/config');
console.log(config.imageDir());

sequelize
  .authenticate()
  .then(() => {
    console.log('Postgres connection has been established successfully.');
    // Auto create table if not already exist
    createDDL();
    createRelationships();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// App
const app = express();
app.use(cors());
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
  console.log(`Server started on port ${PORT}...`);
});
