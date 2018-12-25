const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');
// const Blog = require('./blog');

const BlogImage = sequelize.define('blogImages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  story_image: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

module.exports = BlogImage;
