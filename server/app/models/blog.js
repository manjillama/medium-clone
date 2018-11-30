const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');
const Blogger = require('./blogger');

const Blog = sequelize.define('blogs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
},{underscored: true});


module.exports = Blog;
