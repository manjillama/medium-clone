/**************** TEST CONTROLLERS *******************************************/
const TestController = require('./controllers/test/testController');
const TopicTestController = require('./controllers/test/topicTestController');
/****************************************************************************/
const HomeController = require('./controllers/homeController');
const Authentication  = require('./controllers/authentication');
const BloggerController  = require('./controllers/bloggerController');
const BlogController  = require('./controllers/blogController');
const BlogTagController  = require('./controllers/blogTagController');
const BlogThumbnailController  = require('./controllers/blogThumbnailController');
const BlogImageController  = require('./controllers/blogImageController');

const StoryController  = require('./controllers/storyController');

const Blogger = require('./models/blogger');
const passportService = require('./services/passport'); // configuring passport to use LocalStrategy and JwtStrategy
const passport = require('passport');

// By default passport will try to make a cookie based session hence session = false
const requireEmailAndPass = passport.authenticate('local', {failureRedirect: '/unauthenticated', session: false});
const requireJwt = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', HomeController);
  app.post('/signup', Authentication.signUp);
  // Restricting end point with LocalStrategy
  app.post('/signin', requireEmailAndPass, Authentication.signIn);

  /*
  * Blogger profile routes
  */
  app.get('/auth/api/user/get-user',requireJwt, BloggerController.getBlogger);  // Restricting end point with JwtStrategy
  app.put('/auth/api/user/edit', requireJwt, BloggerController.updateBloggerInfo);
  app.get('/auth/api/user/blogs/:status',requireJwt, BlogController.getUserStories);

  /*
  * Blog actions
  */
  app.post('/auth/blog/create-blog',requireJwt, BlogController.createBlog);
  app.get('/auth/blog/action/get/:id',requireJwt, BlogController.getBlog);
  app.post('/auth/blog/action/publish/:id',requireJwt, BlogController.publishBlog);
  app.delete('/auth/blog/action/delete/:id',requireJwt, BlogController.deleteBlog);
  app.get('/auth/blog/get/blog-count/',requireJwt, BlogController.getBlogCount);

  /*
  * Blog thumbnail
  */
  app.post('/auth/blog/action/upload-thumbnail/:id',requireJwt, BlogThumbnailController.uploadThumbnail);
  app.delete('/auth/blog/action/remove-thumbnail/:id',requireJwt, BlogThumbnailController.removeThumbnail);

  /*
  * Blog image
  */
  app.post('/auth/blog/action/upload-image/:postId',requireJwt, BlogImageController.uploadBlogImage);


  /*
  * Blog Tags
  */
  app.post('/auth/blog/action/publish/add-tag/:postId',requireJwt, BlogTagController.addBlogTag);
  app.delete('/auth/blog/action/publish/remove-tag/:postId/:tagId',requireJwt, BlogTagController.removeBlogTag);
  app.get('/auth/blog/action/publish/get-tag/:postId',requireJwt, BlogTagController.fetchBlogTag);

  /*
  * Public Apis
  */
  app.get('/api/story/:id', StoryController.fetchStory);
  app.get('/api/user/get-user/:username', BloggerController.getBloggerByUsername);
  app.get('/api/user/get-stories/:id', StoryController.fetchUserStories);
  /*
  * Testing
  */
  app.get('/users', TestController.findAllUsers);
  app.get('/test-user', TestController.findByUsernameOrEmail);
  app.get('/test-tags', TestController.findUserStoryBlogTags);
  app.get('/test-stories', TestController.findAllStories);
  app.get('/test-topic/:topic', TopicTestController.findByTopic);


  app.get('/unauthenticated', function(req, res){res.json({error: "Authentication Failed"})});

}
