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

        await uploadStoryThumbnail(storyImage, blog);  //uploading thumbnail
        uploadStoryImage(storyImage, blog); // uploading true size image

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

async function uploadStoryThumbnail(storyImage, blog){
  const dimensions = sizeOf(storyImage.data);
  const { width, height } = dimensions;
  let story_thumb = null;
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

    story_thumb = await imageService.saveImage(blog.blogger_id, storyImage.data, null, width1, height1)
  }else{
    story_thumb = await imageService.saveImage(blog.blogger_id, storyImage.data);
  }

  await BlogThumbnail.create({
    story_thumb,
    is_thumb: true,
    blog_id: blog.id
  })
}

async function uploadStoryImage(storyImage, blog){

  const story_thumb = await imageService.saveImage(blog.blogger_id, storyImage.data);

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
      * Fetch thumbnails and delete images
      */
      await BlogThumbnail.findAll({
        where: {
          blog_id: postId
        }
      }).then(blogThumbnails => {
        /*
        * @params
        *   - Array of images to be deleted
        *   - database column name
        */
        imageService.deleteUserImages(blogThumbnails, 'story_thumb');
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
