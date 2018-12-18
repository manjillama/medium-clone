const Blog = require('../models/blog');
const config = require('../config/config');
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
