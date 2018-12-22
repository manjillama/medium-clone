const Blog = require('../models/blog');
const BlogTag = require('../models/blogTag');
const sharp = require('sharp');
const config = require('../config/config');
var fs = require('fs');

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
      if(blog){
        blog.update(post)
        .then(() => { res.send({status: 'ok'})})
        .catch( err =>{
          res.status(500);
        });
      }
    });
  }else{
    post.created_at = config.getUtcTimestamp();
    Blog.create(post)
    .then(blog => {res.json({postId: blog.id})});
  }
}

exports.getBlog = function(req, res){
  Blog.findOne({
    where: {
      id: req.params.id,
      blogger_id: req.user.id
    }
  }).then(blog => {
    res.json({blog});
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
    res.json(blog);
  });
}

exports.publishBlog = async (req, res) => {
  const file = req.files;
  const postId = req.params.id;
  const tags = req.body.tags.split(',');
  let storyThumbnail = null;
  let post = {
    status: true
  }

  if(file){
    const {storyImage} = file;
    

    // let mimeType = storyImage.mimetype;
    // if(mimeType.split('/')[0] === 'image'){
    //   const outputDir = config.storyImageDir();
    //   const imageName = postId+'.jpg';
    //   storyThumbnail = config.resourceHost+config.storyImageResourceUrl+imageName;
    //   sharp(storyImage.data).resize(160, 160)
    //     .toFile(outputDir+imageName);
    // }
  }

  //
  // await Blog.findByPk(postId).then(blog => {
  //   if(blog){
  //     blog.update(post);
  //   }
  // });
  //
  // let postTags = [];
  // tags.forEach(tag => {
  //   const tagObj = {
  //     tag,
  //     blog_id: postId
  //   }
  //   postTags.push(tagObj);
  // });
  //
  // await BlogTag.bulkCreate(postTags);

  res.send("Ok");
}
