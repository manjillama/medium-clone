const BlogTag = require('../models/blogTag');

exports.addBlogTag = (req, res) => {
  const tag = req.body.tag;
  const postId = req.params.postId;

  const tagObj = {
    tag,
    blog_id: postId
  }
  BlogTag.create(tagObj).then(blogTag => {
    BlogTag.findAll({
      where: {
        blog_id: postId
      }
    }).then(blogTags => {
      res.json(blogTags);
    });
  });
}

exports.removeBlogTag = (req, res) => {
  const tagId = req.body.id;
  const postId = req.params.postId;

  BlogTag.destroy({
    where: {
      id: tagId
    }
  }).then(() => {
    BlogTag.findAll({
      where: {
        blog_id: postId
      }
    }).then(blogTags => {
      res.json(blogTags);
    });
  });
}

exports.fetchBlogTag = (req, res) => {
  const postId = req.params.postId;

  BlogTag.findAll({
    where: {
      blog_id: postId
    }
  }).then(blogTags => {
    res.json(blogTags);
  });
}
