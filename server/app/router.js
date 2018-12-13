const TestController = require('./controllers/testController');
const HomeController = require('./controllers/homeController');
const Authentication  = require('./controllers/authentication');
const BloggerController  = require('./controllers/BloggerController');
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
  app.get('/api/user/get-user', requireJwt, BloggerController.getBlogger);  // Restricting end point with JwtStrategy
  app.post('/api/user/edit', BloggerController.updateBloggerInfo);
  app.get('/api/user/get-user/:username', BloggerController.getBloggerByUsername);

  /*
  * Testing
  */
  app.get('/users', TestController.findAllUsers);
  app.get('/test-user', TestController.findByUsernameOrEmail);
  
  app.get('/unauthenticated', function(req, res){res.json({error: "Authentication Failed"})});

}
