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
    let sampleFile = req.files.uploaded_image;
    sampleFile.mv(config.imageDir()+req.body.username+'.jpg', function(err) {
       if (err)
         return res.status(500).send(err);

       res.send('File uploaded!');
     });
  }else{
    console.log("No files");
    res.send("OK");
  }
}
