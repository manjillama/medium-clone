const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');
// const Blog = require('./blog');

const BlogTag = sequelize.define('blogTags', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { underscored: true });

module.exports = BlogTag;
