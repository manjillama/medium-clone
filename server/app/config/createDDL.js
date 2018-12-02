const User = require('../models/user');
const Blogger = require('../models/blogger');
const Blog = require('../models/blog');

module.exports = () => {
  // Create users table : force: true means drop if already exist
  let autoCreateDDL = false;
  User.sync({force: autoCreateDDL}).then(() => {
    Blogger.sync({force: autoCreateDDL}).then(() => {
        Blog.sync({force: autoCreateDDL}).then(() => {

        });
    });
  });
};