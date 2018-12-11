const User = require('../models/user');
const Blogger = require('../models/blogger');
const Sequelize = require('sequelize');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;

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

exports.findByUsernameOrEmail = (req, res) => {
  let username = 'QTem3fRRE';
  User.findOne({
    include: [{
      model: Blogger,
      where: {
        [Op.or]: [{username: username},{user_email: username}]
      }
    }]
  }).then(users => {
    res.send(users);
  });
}

exports.updateBloggerInfo = (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send("OK");
}
