const User = require('../models/user');
const Blogger = require('../models/blogger');
const Sequelize = require('sequelize');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const config = require('../config/config');
const sharp = require('sharp'); // https://github.com/lovell/sharp

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
  let profileImageUrl = req.body.profile_image;
  // If user has uploaded profile image
  if(req.files && req.files.uploaded_image){
    let userImage = req.files.uploaded_image;
    let mimeType = userImage.mimetype;
    if(mimeType.split('/')[0] === 'image'){
      const outputDir = config.imageDir();
      const imageName = req.body.id+'.jpg';
      profileImageUrl = config.resourceHost+config.imageResourceUrl+imageName;
      sharp(userImage.data).resize(160, 160)
        .toFile(outputDir+imageName);
    }
  }

  Blogger.findByPk(req.body.id).then(blogger => {
    if(blogger){
      blogger.updateAttributes({
        fullname: req.body.fullname,
        bio: req.body.bio,
        profile_image: profileImageUrl
      });
    }
  });
  res.json({success: 'Ok'})
}
