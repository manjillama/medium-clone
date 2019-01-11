const Blogger = require('../models/blogger');
const sharp = require('sharp'); // https://github.com/lovell/sharp
const config = require('../config/config');
var fs = require('fs');
const imageService = require('../services/imageService');
const bloggerEs = require('../services/elastic-search/bloggerEs');

exports.updateBloggerInfo = (req, res) => {
  const bloggerId = req.user.id;
  Blogger.findByPk(bloggerId).then(async blogger => {
    if(blogger){

      let profileImageUrl = req.body.profile_image;
      // If user has uploaded profile image
      if(req.files){
        const userImage = req.files.uploaded_image;
        if(imageService.validateImage(userImage)){
          /*
          * If profile image already exist then
          * extract image name and pass it to update image
          */
          if(blogger.profile_image){
            const imageName = blogger.profile_image.match(/[\w-]+\.jpg/g)[0];
            profileImageUrl = await imageService.saveImage(bloggerId,userImage.data,imageName,160,160);
          }else{
            profileImageUrl = await imageService.saveImage(bloggerId,userImage.data,null,160,160);
          }
        }
      }

      const bloggerData = {
        fullname: req.body.fullname,
        bio: req.body.bio,
        profile_image: profileImageUrl
      }

      /*
      * Issue: null value gets converted into string 'null' when sent from client
      */
      if(req.body.bio === 'null')
        bloggerData.bio = null;
      if(profileImageUrl === 'null')
        bloggerData.profile_image = null;

      blogger.update(bloggerData).then((res) => {
        /* Elastic search indexing */
        bloggerEs.updateBlogger(res);
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
