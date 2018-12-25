const Blog = require('../models/blog');
const Blogger = require('../models/blogger');
const BlogImage = require('../models/blogImage');

exports.fetchStory = async (req, res) => {

  const { id } = req.params;

  Blog.findOne({
    where: {
      status: true,
      id
    },
    include: [{
      model: Blogger,
    },{
      model: BlogImage,
    }]
  }).then(blog => {
    res.json({blog});
  });
}

exports.fetchUserStories = (req, res) => {
  const { id } = req.params;

  Blog.findAll({
    where: {
      status: true,
      blogger_id: id
    },
    order: [
      ['created_at', 'DESC'],
    ],
  }).then(blogs => {
    res.json(blogs);
  });
}
