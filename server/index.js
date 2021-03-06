const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

// connect to the database and load models
require('./models').connect(config.dbUri);

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./static/'));

// cors - must be before app use routes
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3002');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');    
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
}
app.use(allowCrossDomain);

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware); // anytime a request to api

// routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// GET test
app.get('/test',
    (req, res) => {
        res.send('Hi from express !');
    });

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});