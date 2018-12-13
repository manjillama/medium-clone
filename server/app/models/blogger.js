const sequelize = require('../config/dbConnection.js');
const Sequelize = require('sequelize');

const Blogger = sequelize.define('bloggers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profile_image: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  bio: {
    type: Sequelize.STRING(160),
  }
}, {
  // creates table in database in snake_case
  underscored: true
});

module.exports = Blogger;
