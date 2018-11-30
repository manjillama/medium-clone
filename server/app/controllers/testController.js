const User = require('../models/user');
const Blogger = require('../models/blogger');
const Sequelize = require('sequelize');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');

exports.findAllUsers = (req, res) => {
  User.findAll({
    include: [{
      model: Blogger,
      include: [Blog]
    }]
  }).then(users => {
    res.send(users);
  });
}
