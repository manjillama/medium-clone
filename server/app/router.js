const TestController = require('./controllers/testController');
const HomeController = require('./controllers/homeController');
const Authentication  = require('./controllers/authentication');

const passportService = require('./services/passport'); // configuring passport to use LocalStrategy and JwtStrategy
const passport = require('passport');

// By default passport will try to make a cookie based session hence session = false
const requireEmailAndPass = passport.authenticate('local', {failureRedirect: '/unauthenticated', session: false});
const requireJwt = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/', HomeController);
  app.post('/signup', Authentication.signUp);
  app.get('/users', TestController.findAllUsers);

  // Restricting end point with LocalStrategy
  app.post('/test-signin', requireEmailAndPass, Authentication.signIn);
  // Restricting end point with JwtStrategy
  app.get('/private', requireJwt, function(req, res){
    res.send("This is secured data");
  });

  app.get('/unauthenticated', function(req, res){ res.send("User Unauthenticated")});

}
