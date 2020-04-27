const Blog = require('../models/blog');
const Blogger = require('../models/blogger');
const BlogThumbnail = require('../models/blogThumbnail');

exports.fetchStory = async (req, res) => {
  const { id } = req.params;

  Blog.findOne({
    where: {
      published: true,
      id
    },
    attributes: ['id', 'title', 'story', 'created_at'],
    include: [
      {
        attributes: ['fullname', 'profile_image', 'username', 'bio'],
        model: Blogger,
      },
      {
        model: BlogThumbnail,
        attributes: ['story_thumb'],
        where: {is_thumb: false},
        required: false
    }
  ]
  }).then(blog => {
    res.json({blog});
  });
}

exports.fetchUserStories = (req, res) => {
  const { id } = req.params;

  Blog.findAll({
    where: {
      published: true,
      blogger_id: id
    },
    order: [
      ['created_at', 'DESC'],
    ],
  }).then(blogs => {
    res.json(blogs);
  });
}
