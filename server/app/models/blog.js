const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');
// const Blogger = require('./blogger');

const Blog = sequelize.define('blogs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  desc_summary: {
    type: Sequelize.STRING(160),
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  modified_at: {
    type: Sequelize.DATE,
  },
  published: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
},{underscored: true, timestamps: false});


module.exports = Blog;
