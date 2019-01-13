const Blogger = require('../models/blogger');

exports.checkAvaibility = (req, res) => {
  const {username} = req.body;

  Blogger.findOne({ where: {username} }).then(blogger => {
    if(blogger)
      return res.json({usernameExist: true});
    return res.json({usernameExist: false});
  });
}

exports.changeUsername = (req, res) => {
  const {username} = req.body;
  const {id} = req.user;
  Blogger.findByPk(id).then(blogger => {
    if(blogger){
      blogger.update({
        username
      })
      .catch( err =>{
        res.status(500);
      });
    }
  });
  return res.send("Done");
}
