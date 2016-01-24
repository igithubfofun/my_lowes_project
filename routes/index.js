var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Project = require('../models/project')
var mongoose = require('mongoose');
var request = require('request');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* Hitting up Wish List api */
router.get('/my_wishlist', function(req, res){

});

router.get('/projects_list', function(req, res){
  res.render('projects_list');
});

/* My projects page */
router.get('/my_projects', function(req, res){
  Project.find({}, function(err, projects){
    projects_length = projects.length;
    res.render('my_projects', {projects_length: projects_length});
  });
});


/* Login form */
router.get('/login', function(req, res){
  res.render('login');
});

router.post('/authenticate', function(req, res){
  var logonId = req.body.logonId;
  var logonPassword = req.body.logonPassword;
  var lowes_logon = {
    logonId: logonId,
    logonPassword: logonPassword
  }
  var key = process.env.LOWES_API_KEY;
  var url = 'http://api.lowes.com/customer/login?api_key='+key;
  request({
          url: url,
          method: "POST",
          headers: {
            'Authorization':'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw=='
          },
          json: true,   // <--Very important!!!
          body: lowes_logon
      }, function (error, response, body){
        if(error) {
          console.log('error: ',error);
        } else {
          console.log('body: ',body);
          console.log(body.SSOToken);
          var token = body.SSOToken;
          res.cookie('SSOToken', token, { httpOnly: true });
          console.log('token: ',token);
          console.log('response: ',response);
          User.findOneAndUpdate({'email': logonId}, {token: token}, function(err) {
            if (err) {
              console.log('got an error');
            }
          });
          res.redirect('/my_projects');
        }
      });

});


/* New User form */
router.get('/register', function(req, res){
	res.render('register');
});

router.post('/new_user', function(req,res,next){
	var email = req.body.email;
	var password1 = req.body.password1;
	var password2 = req.body.password2;
	var phone = req.body.phone;
	var zipCode = req.body.zipCode;
	var address1 = req.body.address1;
	var address2 = req.body.address2;
  var city = req.body.city;
	var state = req.body.state;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;

  var lowes_user = {
    phoneUS: phone,
    password1: password1,
    password2: password2, 
    email1: email,
    zipCode: zipCode,
    storeNumber: "",
    firstName: firstName, 
    lastName: lastName,
    activityGuid: "",
    myLowesCardNumber: "",
    city: city,
    state: state,  
    address1: address1, 
    address2: address2,
    subscriptions: ""  
  };
  var key = process.env.LOWES_API_KEY;
  var url = 'http://api.lowes.com/customer/registration?api_key='+key;

  request({
      url: url,
      method: "POST",
      headers: {
        'Authorization':'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw=='
      },
      json: true,   // <--Very important!!!
      body: lowes_user
    }, function (error, response, body){
    if (error) {
      console.log('error: ',error);
      res.redirect('/register');
    } else {
      // console.log('body: ',body);
      console.log('token: ', body.SSOToken)
      var token = body.SSOToken;
      // console.log('response: ',response);
      var new_user = new User({
        email: email,
        password1: password1,
        password2: password2, 
        phone: phone, 
        zipCode: zipCode, 
        address1: address1, 
        address2: address2,
        city: city, 
        state: state, 
        firstName: firstName, 
        lastName: lastName,
        token: token
      });
      console.log(new_user);
      new_user.save(function(err) {
        if (err) {
          console.log('User did not save');
        } else {
          console.log('User saved successfully');
          res.redirect('/');
        }
      });
    }
  });
});

module.exports = router;

