const Blogger = require('../models/blogger');
const sharp = require('sharp'); // https://github.com/lovell/sharp
const config = require('../config/config');


exports.updateBloggerInfo = async (req, res) => {
  let profileImageUrl = req.body.profile_image;
  // If user has uploaded profile image
  if(req.files && req.files.uploaded_image){
    let userImage = req.files.uploaded_image;
    let mimeType = userImage.mimetype;
    if(mimeType.split('/')[0] === 'image'){
      const outputDir = config.bloggerImageDir();
      const imageName = req.body.id+'.jpg';
      profileImageUrl = config.resourceHost+config.bloggerImageResourceUrl+imageName;
      await sharp(userImage.data).resize(160, 160)
        .toFile(outputDir+imageName);
    }
  }

  Blogger.findByPk(req.body.id).then(blogger => {
    if(blogger){
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
