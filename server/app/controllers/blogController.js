const Blog = require('../models/blog');
const BlogTag = require('../models/blogTag');
const config = require('../config/config');
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

exports.deleteBlog = async (req, res) => {
  await Blog.findOne({
    where: {
      id: req.params.id,
      blogger_id: req.user.id
    }
  }).then(blog => {
    if(blog){
      const storyThumb = blog.story_thumbnail;
      if(storyThumb){ // if story thumbnail exist
        const imageName = storyThumb.match(/[\w-]+\.jpg/g)[0];
        try {
          fs.unlinkSync(config.storyImageDir()+imageName);
        } catch (err) {
          // handle the error
          console.log(err);
        }
      }
      // Delete story
      return blog.destroy();
    }
  });
  res.status(200).send("Ok");
}
