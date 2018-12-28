const Blog = require('../models/blog');
const imageService = require('../services/imageService');
const config = require('../config/config');
const BlogImage = require('../models/blogImage');

exports.uploadBlogImage = (req, res) => {
  const file = req.files;
  const postId = req.params.postId;

  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(async blog => {

    if(blog){
      if(blog && file){
        const {storyImage} = file;
        if(imageService.validateImage(storyImage)){ //Validating image
          const outputDir = config.userImageResourceDir(req.user.id);
          const imageName = config.getRandomString()+".jpg";
          await imageService.saveImage(outputDir, imageName, storyImage.data);

          const story_image = config.resourceHost+config.userImageResourceUrl(req.user.id)+imageName;

          BlogImage.create({
            story_image,
            blog_id: blog.id
          }).then(blogImage => {
            res.json(blogImage);
          });
        }
      }
    }

  });
}
