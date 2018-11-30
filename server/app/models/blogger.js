const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');

const Blogger = sequelize.define('bloggers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.TEXT,
  }
}, {
  // creates table in database in snake_case
  underscored: true,
  defaultScope: {
    // Excluding passwor from rest api
    attributes: { exclude: ['password'] },
  }
});

module.exports = Blogger;
