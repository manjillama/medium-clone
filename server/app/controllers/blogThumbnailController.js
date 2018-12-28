const Blog = require('../models/blog');
const BlogThumbnail = require('../models/blogThumbnail');

const sharp = require('sharp');
var sizeOf = require('image-size');
const fs = require('fs');
const config = require('../config/config');
const imageService = require('../services/imageService');

exports.uploadThumbnail = async (req, res) => {

  const file = req.files;
  const postId = req.params.id;

  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(async blog => {
    if(blog && file){

      const {storyImage} = file;
      if(imageService.validateImage(storyImage)){ //Validating image
        const outputDir = config.userImageResourceDir(blog.blogger_id);

        await uploadStoryThumbnail(outputDir, storyImage, blog);  //uploading thumbnail
        uploadStoryImage(outputDir, storyImage, blog); // uploading true size image

        return BlogThumbnail.findAll({
          where: {
            blog_id: blog.id
          }
        }).then(blogThumbnails => {
          return res.json(blogThumbnails);
        });
      }

    }
    res.json({error: "No file found"});
  });
}

async function uploadStoryThumbnail(outputDir, storyImage, blog){
  const imageName = config.getRandomString()+'_thumb.jpg';
  const dimensions = sizeOf(storyImage.data);
  const { width, height } = dimensions;
  if(width > 300){
    /*
    * w: 1200 h:1000
    * =
    * w1: 300  h1
    * --------------
    * wh1 = hw1 or, h1 = hw1/w
    */
    const width1 = 300;
    const height1 = Math.ceil(height*width1/width);

    await imageService.saveImage(outputDir, imageName, storyImage.data, width1, height1)
  }else{
    await imageService.saveImage(outputDir, imageName, storyImage.data);
  }

  const story_thumb = config.resourceHost+config.userImageResourceUrl(blog.blogger_id)+imageName;

  await BlogThumbnail.create({
    story_thumb,
    is_thumb: true,
    blog_id: blog.id
  })
}

async function uploadStoryImage(outputDir, storyImage, blog){
  const imageName = config.getRandomString()+'.jpg';

  await imageService.saveImage(outputDir, imageName, storyImage.data);

  const story_thumb = config.resourceHost+config.userImageResourceUrl(blog.blogger_id)+imageName;

  await BlogThumbnail.create({
    story_thumb,
    blog_id: blog.id
  })
}


exports.removeThumbnail = (req, res) => {
  const postId = req.params.id;
  /*
  * Removing story thumbnail
  * Finding blog using id and blogger id
  */
  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(async blog => {
    if(blog){

      /*
      * Fetch thumbnails and delete image
      */
      await BlogThumbnail.findAll({
        where: {
          blog_id: postId
        }
      }).then(blogThumbnails => {
        blogThumbnails.forEach(thumb => {
          const imageName = thumb.story_thumb.match(/[\w-]+\.jpg/g)[0];
          try {
            fs.unlinkSync(config.userImageResourceDir(req.user.id)+imageName);
          } catch (err) {
          }
        });
      });

      /*
      * Find thumbnails and deleting image url from database
      */
      BlogThumbnail.destroy({
        where: {
          blog_id: postId
        }
      });

    }
  });

}
