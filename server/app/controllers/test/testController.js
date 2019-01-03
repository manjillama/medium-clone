const User = require('../../models/user');
const Blogger = require('../../models/blogger');
const Sequelize = require('sequelize');
const Blog = require('../../models/blog');
const BlogTag = require('../../models/blogTag');
const BlogThumbnail = require('../../models/blogThumbnail');

const bcrypt = require('bcrypt');
const Op = Sequelize.Op;

exports.findAllUsers = (req, res) => {
  User.findAll({
    include: [{
      model: Blogger,
      include: [Blog]
    }]
  }).then(users => {
    res.send(users);
  });
}

exports.findAllStories = (req, res) => {

  Blog.findAll({
    where: {
      published: true
    },
    attributes: ['id', 'title', 'desc_summary', 'created_at'],
    include: [
      {
        attributes: ['story_thumb'],
        model: BlogThumbnail,
        where: {is_thumb: true},
        required: false
      },
      {
        attributes: ['fullname', 'username'],
        model: Blogger,
      }
    ],
    order: [
      ['created_at', 'DESC'],
    ],
  }).then(blogs => {
    res.send(blogs);
  });

}



exports.findByUsernameOrEmail = (req, res) => {
  let username = 'QTem3fRRE';
  User.findOne({
    include: [{
      model: Blogger,
      where: {
        [Op.or]: [{username: username},{user_email: username}]
      }
    }]
  }).then(users => {
    res.send(users);
  });
}

exports.findUserStoryBlogTags = (req, res) => {
  const blogId = 1;
  const bloggerId = 1;
  BlogTag.findAll({
    attributes: ['tag', 'id'],
    include: [{
      model: Blog,
      attributes: [],
      where: {
        id: blogId,
        blogger_id: bloggerId
      }
    }]
  }).then(blogTags => {
    res.send(blogTags);
  });
}
