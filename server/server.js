/* server.js - Node.js and Express.js routing
# Angular takes over the front-end */

'use strict';

/* requires */
var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;

/* define var app for Express */
var app = express();

/* define var User for login and registration purposes */
var User = require('./datasets/users.js');

/* Mongoose connection */
//mongoose.connect('mongodb://localhost:27017/spxdb');

/* set up the bodyParser module  */
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());

/* Passport config */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* define controllers as dependencies */
var authController = require('./auth/auth.controller.js');
//var dashboardController = require('./dashboard/dashboard.controller.js')
var errorController = require('./error/error.controller.js');
//var playlistController = require('./playlist/playlist.controller.js');
var loginController = require('./login/login.controller.js');
var signUpController = require('./signup/signup.controller.js');

/* endpoint controllers with file callback */
/* static page (path) set to authenticate or default to root when page not found */
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static(path.join(__dirname, '../client'))).use(cookieParser());
app.use('/dashboard', express.static(path.join(__dirname, '../client/dashboard')))
app.use('/dashboard', express.static(path.join(__dirname, '../client/playlist')))

app.get('/authenticate', function (req, res) {
	res.sendFile(path.join(__dirname, '../client/index.html'))
});
app.get('/me', function (req, res) {
		res.sendFile(path.join(__dirname, '../client/dashboard/dashboard.html'))
		}); // get full screen dashboard.html to override index.html

/* endpoint controllers with method callback */
app.get('/token_request', authController.authLogin);
app.get('/token_callback', authController.handleAuthCallback);
app.get('/token_refresh', authController.getRefreshToken);
//app.get('/me/playlist', playlistController.getPlaylist);
app.get('/me/playlist/all');
//app.get('/me/playlist/new', playlistController.createPlaylist);
app.post('/login', loginController.logIn);
app.get('/logout', loginController.logOut);
app.post('/signup', signUpController.signUp);
app.get('/error', errorController.errorHandling);

/* 404 route */
app.use(function (req, res, next) {
	res.status(404).sendFile(path.join(__dirname, '../client/public/error.html'))
});

/* Error handlers */
app.use (function (req, res, next) {
	var err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.end(JSON.stringify({
		message: err.message,
		error: {}
	}));
});

/* Listen to */
app.listen(process.env.port || 3000, function () {
	console.log('SPX app listening op port 3000');
});
