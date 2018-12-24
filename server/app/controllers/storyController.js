const Blog = require('../models/blog');
const Blogger = require('../models/blogger');

exports.fetchStory = async (req, res) => {

  const { id } = req.params;

  Blog.findOne({
    where: {
      status: true,
      id
    },
    include: [{
      model: Blogger
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
    }
  }).then(blogs => {
    res.json(blogs);
  });
}
