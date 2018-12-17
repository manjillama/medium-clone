const Blog = require('../models/blog');

exports.createBlog = (req, res) => {
  // If post alreadt exit then edit post
  const postId = req.body.postId;
  let post = {
    title: req.body.title,
    description: req.body.post,
    modified_at: new Date().getTime(),
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
    post.created_at = new Date().getTime();
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
