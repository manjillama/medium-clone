const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');
// const Blog = require('./blog');

const BlogThumbnail = sequelize.define('blogThumbnails', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  is_thumb: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  story_thumb: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

module.exports = BlogThumbnail;
