const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// tell the app to look for static files in these directories
app.use(express.static('./static/'));

// cors - must be before app use routes
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// GET test
app.get('/test',
    (req, res) => {
        res.send('Hi from express !');
    });

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});