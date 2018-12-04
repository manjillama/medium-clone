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
  return jwt.encode({ sub: user.email, iat: timestamp }, config.secret);
}

exports.signIn = (req, res) => {
  // user is passed through passport local strategy
  res.json({ token: tokenForUser(req.user), user: req.user});
}

exports.signUp = (req, res) => {
  let user = {
    email : req.body.email,
    password: req.body.password,
    role: 'ROLE_BLOGGER',
    created_at: new Date().getTime()
  };

  let blogger = {
    bio : req.body.bio,
    user_email: req.body.email
  }

  // Persisting in database
  User.create(user)
  .then(() => {
    Blogger.create(blogger)
    .then(() => {
      // Deleting user password from user object
      delete user.password;
      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) , user: user});
    })
  })
  .catch(error => {
    res.send(error);
  });
}
