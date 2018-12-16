const Blog = require('../models/blog');

exports.createBlog = (req, res) => {
  let blog = {
    title: req.body.title,
    description: req.body.post,
    created_at: new Date().getTime(),
    modified_at: new Date().getTime(),
    blogger_id: req.user.id
  }

  Blog.create(blog)
  .then(blog => {res.json({postId: blog.id})});
}
