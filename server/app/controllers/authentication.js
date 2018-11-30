const User = require('../models/user');
const Blogger = require('../models/blogger');
const config = require('../config/config');

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

/*
* Generating token for user
*/
function tokenForUser(user){
  const timestamp = new Date().getTime();
  /*
  * sub stands for subject, as to whom does this token belongs to
  * iat stands for issued at time.
  */
  return jwt.encode({ sub: user.username, iat: timestamp }, config.secret);
}

exports.signIn = (req, res) => {
  res.send({ token: tokenForUser(req.user) });
}

exports.signUp = async (req, res) => {
  let user = {
    username : req.body.username,
    password: req.body.password,
    role: 'ROLE_BLOGGER',
    created_at: new Date().getTime()
  };

  let blogger = {
    email : req.body.email,
    bio : req.body.bio,
    user_username: req.body.username
  }

  // Persisting in database
  User.create(user)
  .then(() => {
    Blogger.create(blogger)
    .then(() => {
      res.send("Success!");
    })
  })
  .catch(error => {
    res.send(error);
  });
}
