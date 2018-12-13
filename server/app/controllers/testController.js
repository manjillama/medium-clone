const User = require('../models/user');
const Blogger = require('../models/blogger');
const Sequelize = require('sequelize');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const config = require('../config/config');

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

  if(req.files && req.files.uploaded_image){
    let userImage = req.files.uploaded_image;
    let mimeType = userImage.mimetype;

    if(mimeType.split('/')[0] === 'image'){
      userImage.mv(config.imageDir()+req.body.username+'.jpg', function(err) {
         if (err)
          console.log(err);
       });
    }
  }
}
