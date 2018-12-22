const User = require('../models/user');
const Blogger = require('../models/blogger');
const Blog = require('../models/blog');
const BlogTag = require('../models/blogTag');

module.exports = function(){
  User.hasOne(Blogger, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Blogger.belongsTo(User, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

  Blogger.hasMany(Blog, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  Blog.belongsTo(Blogger, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

  Blog.hasMany(BlogTag, {foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  BlogTag.belongsTo(Blog, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

}
