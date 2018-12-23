const Blog = require('../models/blog');
const BlogTag = require('../models/blogTag');
const sharp = require('sharp');
const config = require('../config/config');
var sizeOf = require('image-size');
const fs = require('fs');

exports.createBlog = (req, res) => {
  // If post alreadt exit then edit post
  const postId = req.body.postId;
  let post = {
    title: req.body.title,
    description: req.body.post,
    modified_at: config.getUtcTimestamp(),
    blogger_id: req.user.id
  }

  // formData assins null as String idk ...
  if(postId !== 'null'){
    Blog.findByPk(postId).then(blog => {
      if(blog)
        blog.update(post)
        .then(() => res.send({status: 'ok'}))
        .catch( err => res.status(500));
    });
  }else{
    post.created_at = config.getUtcTimestamp();
    Blog.create(post)
    .then(blog => res.json( {postId: blog.id}) );
  }
}

exports.getBlog = function(req, res){
  Blog.findOne({
    where: {
      id: req.params.id,
      blogger_id: req.user.id
    }
  }).then(blog => {
    return res.json({blog});
  });
}

exports.getUserStories = (req, res) => {
  const userId = req.user.id;
  const status  = req.params.status;  // true for published and false for drafts
  Blog.findAll({
    where: {blogger_id: userId, status},
    order: [['modified_at', 'DESC']],
    attributes: ['id', 'title', 'description', 'created_at', 'modified_at']
  }).then(blog => {
    return res.json(blog);
  });
}

exports.publishBlog = async (req, res) => {
  const file = req.files;

  const userId = req.user.id;

  await Blog.findOne({
    where: {
      id: req.params.id,
      blogger_id: req.user.id
    }
  }).then(blog => {
    if(blog){
      blog.update({
        status: true
      });
    }
  });

  res.status(200).send("Ok");
}

exports.uploadThumbnail = async (req, res) => {

  const file = req.files;
  const postId = req.params.id;

  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(async blog => {
    if(blog){
      if(file){
        const {storyImage} = file;
        const storyThumbnail = await uploadStoryImage(storyImage, postId);
        if(storyThumbnail){
          Blog.findByPk(postId).then(blog => {
            if(blog){
              blog.update({
                story_thumbnail: storyThumbnail
              }).then(blog => res.json(blog));
            }
          });
        };
      }else{
        res.json({error: "No file found"});
      }
    }
  });

}

exports.removeThumbnail = (req, res) => {
  const postId = req.params.id;
  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(blog => {
    const imageName = blog.story_thumbnail.match(/[\w-]+\.jpg/g)[0];
    // Extracting image name from url
    blog.update({story_thumbnail: null});

    try {
      fs.unlinkSync(config.storyImageDir()+imageName);
    } catch (err) {
      // handle the error
    }
    res.send("ok");
  });
}

async function uploadStoryImage(storyImage, postId){
  let storyThumbnail = null;

  let mimeType = storyImage.mimetype;
  if(mimeType.split('/')[0] === 'image'){
    const outputDir = config.storyImageDir();
    const imageName = postId+'.jpg';
    storyThumbnail = config.resourceHost+config.storyImageResourceUrl+imageName;
    /*
    * Resizing image to 300 * ? dimensions
    */
    const dimensions = sizeOf(storyImage.data);
    const { width } = dimensions;
    const { height } = dimensions;
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
      await sharp(storyImage.data).resize(width1, height1)
        .toFile(outputDir+imageName);
    }else{
      await sharp(storyImage.data).toFile(outputDir+imageName);
    }
  }

  return storyThumbnail;
}
