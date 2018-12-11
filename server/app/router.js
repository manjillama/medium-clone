const TestController = require('./controllers/testController');
const HomeController = require('./controllers/homeController');
const Authentication  = require('./controllers/authentication');
const Blogger = require('./models/blogger');
const passportService = require('./services/passport'); // configuring passport to use LocalStrategy and JwtStrategy
const passport = require('passport');

// By default passport will try to make a cookie based session hence session = false
const requireEmailAndPass = passport.authenticate('local', {failureRedirect: '/unauthenticated', session: false});
const requireJwt = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', HomeController);
  app.post('/signup', Authentication.signUp);

  app.get('/users', TestController.findAllUsers);
  app.get('/test-user', TestController.findByUsernameOrEmail);
  app.post('/update-user', TestController.updateBloggerInfo);


  // Restricting end point with LocalStrategy
  app.post('/signin', requireEmailAndPass, Authentication.signIn);
  // Restricting end point with JwtStrategy
  app.get('/api/get-username', requireJwt, function(req, res){
    // user is passed through passport local strategy
    return res.json({username: req.user.username});
  });
  app.get('/api/get-user/:username', function(req, res){
    Blogger.findOne({ where: {username: req.params.username} }).then(blogger => {
      if(blogger)
        return res.json(blogger);
      return res.json({error: 'No user found'});
    });
  });

  app.get('/unauthenticated', function(req, res){res.json({error: "Authentication Failed"})});

}
