const User = require('../models/user');
const Blogger = require('../models/blogger');
const config = require('../config/config');
var randomstring = require("randomstring");

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const esBlogger = require('../services/elastic-search/bloggerEs');

/*
* Generating token for user
*/
function tokenForUser(user){
  const timestamp = new Date().getTime();
  /*
  * sub stands for subject, as to whom does this token belongs to
  * iat stands for issued at time.
  */
  return jwt.encode({ sub: user.email, iat: timestamp }, config.SECRET);
}

exports.signIn = (req, res) => {
  // user is passed through passport local strategy
  Blogger.findOne({ where: {user_email: req.user.email} }).then(blogger => {
    return res.json({
      token: tokenForUser(req.user),
      user: {username: blogger.username, profile_image: blogger.profile_image, fullname: blogger.fullname}
    });
  });
}

exports.signUp = (req, res) => {
  let user = {
    email : req.body.email,
    password: req.body.password,
    role: 'ROLE_BLOGGER',
    created_at: new Date().getTime()
  };

  function createUser(){
    var username = randomstring.generate(9);
    // Check if user already exist with that username
    Blogger.findOne({ where: {username: username} }).then(blogger => {
      if(blogger){
         // If blogger with that username already exist
        createUser();
      }else{
        let blogger = {
          username,
          fullname : req.body.fullname,
          user_email: req.body.email,
          profile_image: null
        }
        // Persisting in database
        User.create(user)
        .then(() => {
          Blogger.create(blogger)
          .then((bloggerRes) => {
            /*
            * Index user to elastic search
            */
            esBlogger.createBlogger(bloggerRes);
            // Deleting user password from user object
            delete user.password;
            // Respond to request indicating the user was created
            return res.json({
              token: tokenForUser(user),
              user: {username: blogger.username, profile_image: blogger.profile_image, fullname: blogger.fullname}
            });
          })
        })
        .catch(error => {
          return res.json({error: 'Email is already taken'});
        });
      }
    })
  }
  createUser();
}
