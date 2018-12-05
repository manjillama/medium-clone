const passport = require('passport');

const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../models/user');
const Blogger = require('../models/blogger');

const config = require('../config/config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*
* Authenticates users through username and password not jwt token
*/
passport.use(new LocalStrategy({
    usernameField : 'email',  //by default its username
  },
  /*
  * Verify this email and password, call done with argument user
  * If it is the correct email and pass.
  * Otherwise call done with argument false
  */
  function(email, password, done) {
    User.findOne({
      include: [{
        model: Blogger,
        where: {
          [Op.or]: [{username: email},{user_email: email}]
        }
      }]
    }).then(user => {
      if(user){
        if(user.validPassword(password))
          return done(null, user);
      }
      return done(null, false);
    });
  }
));


// Set up option for jwt strategy
const jwtOptions = {
  /*
  * Jwt token can sit any where on the request i.e. body, url, headers
  * So we have to specifically tell strategy where to look
  */
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),  // look at header called authorization to find the token
  secretOrKey: config.SECRET
};

/*
* Authenticates users with Jwt tokens
* Create jwt strategy
* Payload is the decoded jwt token data (sub, iat)
* Done is a callback function which we need to call depending on whether or not we are
* Able to successfulyy authenticate the user
*/
passport.use(new JwtStrategy(jwtOptions, function(payload, done){
  Blogger.findOne({ where: {user_email: payload.sub} }).then(blogger => {
    if(blogger)
      return done(null, blogger);
    return done(null, false)
  });
}));
