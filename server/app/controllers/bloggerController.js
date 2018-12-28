const Blogger = require('../models/blogger');
const sharp = require('sharp'); // https://github.com/lovell/sharp
const config = require('../config/config');
var fs = require('fs');
const imageService = require('../services/imageService');

exports.updateBloggerInfo = (req, res) => {

  Blogger.findByPk(req.user.id).then(async blogger => {
    if(blogger){

      let profileImageUrl = req.body.profile_image;
      // If user has uploaded profile image
      if(req.files && req.files.uploaded_image){
        let userImage = req.files.uploaded_image;
        let mimeType = userImage.mimetype;
        if(mimeType.split('/')[0] === 'image'){

          const outputDir = config.userImageResourceDir(req.user.id);

          let imageName;

          /*
          * If profile image already exist then
          * extract image name
          * and set profileImageUrl
          */
          if(blogger.profile_image){
            imageName = blogger.profile_image.match(/[\w-]+\.jpg/g)[0];
            profileImageUrl = blogger.profile_image;
          }else{
            imageName = config.getRandomString()+'.jpg';
            profileImageUrl = config.resourceHost+config.userImageResourceUrl(req.user.id)+imageName;
          }

          await imageService.saveImage(outputDir,imageName,userImage.data,160,160);
        }
      }

      blogger.update({
        fullname: req.body.fullname,
        bio: req.body.bio,
        profile_image: profileImageUrl
      })
      .catch( err =>{
        res.status(500);
      });
    }
  });
  res.json({success: 'Ok'})
}

exports.getBlogger = function(req, res){
  // user is passed through passport local strategy
  return res.json({
    user: {username: req.user.username, profile_image: req.user.profile_image, fullname: req.user.fullname}
  });
}

exports.getBloggerByUsername = function(req, res){
  Blogger.findOne({ where: {username: req.params.username} }).then(blogger => {
    if(blogger)
      return res.json(blogger);
    return res.json({error: 'No user found'});
  });
}
