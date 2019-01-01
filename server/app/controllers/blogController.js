const Blog = require('../models/blog');
const BlogTag = require('../models/blogTag');
const BlogThumbnail = require('../models/blogThumbnail');
const BlogImage = require('../models/blogImage');
const config = require('../config/config');
const imageService = require('../services/imageService');

exports.createBlog = (req, res) => {
  // If post alreadt exit then edit post
  const postId = req.body.postId;
  let post = {
    title: req.body.title,
    description: req.body.post,
    desc_summary: req.body.descSummary,
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
    },
    include: [
      {
        model: BlogThumbnail,
        attributes: ['story_thumb'],
      }
    ]
  }).then(blog => {
    return res.json({blog});
  });
}

exports.getUserStories = (req, res) => {
  const userId = req.user.id;
  const published  = req.params.status;  // true for published and false for drafts
  Blog.findAll({
    where: {blogger_id: userId, published},
    order: [['modified_at', 'DESC']],
    attributes: ['id', 'title', 'created_at', 'modified_at']
  }).then(blog => {
    return res.json(blog);
  });
}

exports.getBlogCount = async (req, res) => {
  const blogger_id = req.user.id;
  let storyCount = {
    published: 0,
    drafts: 0
  }
  await Blog.count({
    where: {blogger_id, published: false}
  }).then( count => {
    storyCount.drafts = count;
  });

  await Blog.count({
    where: {blogger_id, published: true}
  }).then( count => {
    storyCount.published = count;
  });
  res.json(storyCount);
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
        published: true
      });
    }
  });

  res.status(200).send("Ok");
}

exports.deleteBlog = async (req, res) => {
  const postId = req.params.id
  await Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(async blog => {
    if(blog){

      await BlogThumbnail.findAll({
        where: {
          blog_id: postId
        }
      }).then(blogThumbnails => {
        /*
        * @params
        * Image rows from database
        * Image column name
        */
        imageService.deleteUserImages(blogThumbnails, 'story_thumb');
      });

      await BlogImage.findAll({
        where: {
          blog_id: postId
        }
      }).then(blogImages => {
        imageService.deleteUserImages(blogImages, 'story_image');
      });

      // Delete story
      return blog.destroy();
    }
  });
  res.status(200).send("Ok");
}
