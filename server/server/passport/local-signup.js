const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email', //map to body prop
  passwordField: 'password', //map to body prop
  session: false, // false since we use token auth
  passReqToCallback: true // true give us optoon to read other params from the POSt body
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); } // i.e. email already exists

    return done(null);
  });
});