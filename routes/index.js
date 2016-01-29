var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user');
var Project = require('../models/project')
var mongoose = require('mongoose');
var request = require('request');
var config = require('../config');
var jwt = require('jsonwebtoken');
var http = require('http');
var fs = require('fs');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var imgData = "";
/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/test', function(req, res, next){
  Project.find({}, function(err, project){
    console.log(project);
    res.render('test', {project: project})
  })
});

// router.get('/sorted', function(req, res, next) {

// });

router.post('/sorting', function(req,res,next){
  var category = req.body.category;
  var projectStyle = req.body.projectStyle;
  console.log("Category: ",category);
  console.log("projectStyle: ", projectStyle);
  Project.find({category:category, projectStyle:projectStyle}, function(err, project){
    console.log("project: ",project);
    console.log("category: ",category);
    console.log("projectStyle: ",projectStyle);
    res.json({
      success: true,
      project: project, 
      category: category, 
      projectStyle:projectStyle, 
      list: 'show'})
  })
});

/* Hitting up Wish List api */
router.get('/my_wishlist', function(req, res){

});

router.get('/projects_list', function(req, res){
  var test = req.headers.cookie;
  if (test){
    console.log("Cookie from header: ",test);
    console.log("test.substring(6): ", test.substring(6));
    User.findOne({token: test.substring(6)}, function(err, user){
      if (user){
        console.log("My projects_list user found one with token!");
        var userId = user['_id'];
        var name = user['firstName'];
        Project.find({userId:userId}, function(err, project){

          res.render('projects_list', {project: project, name:name});
        })
      } else {
        console.log("Not logged in");
        res.redirect('/login');
      }
    });
  } else {
    console.log("No token");
    res.redirect('/login');
  }
});

/* My projects page */
router.get('/my_projects', function(req, res){
  var test = req.headers.cookie;
  if (test){
    console.log("Cookie from header: ",test);
    console.log("test.substring(6): ", test.substring(6));
    User.findOne({token: test.substring(6)}, function(err, user){
      if (user){
        console.log("My projects user find one with token: ");
        var name = user['firstName'];
        var userId = user['_id'];
        res.render('my_projects', {name:name, userId:userId});
      } else {
        console.log("Not logged in");
        res.redirect('/login');
      }
    });
  } else {
    console.log("No token");
    res.redirect('/login');
  }
});


router.post('/new_project', upload.array('img'), function(req, res, next){
  var userId = req.body.userId;
  console.log(userId);
  var projectName = req.body.projectName;
  var category = req.body.category;
  var projectStyle = req.body.projectStyle;
  var numberOfSteps = parseInt(req.body.numberOfSteps);
  console.log("number of steps: "+numberOfSteps);
  var album = [];
  for(i=0;i<numberOfSteps+1;i++){
    console.log("file",req.files[i]);
    console.log("file",req.files[i]['path'])
    var b = fs.readFileSync(req.files[i]['path'])
    imgData = b.toString('base64');
    var bodyComment = 'comment'+i;
    var comment = req.body[bodyComment];
    console.log("part of imgData: ",imgData.substring(1,20))
    var bodyStep = 'step'+i;
    var step = req.body[bodyStep];
    album.push([imgData, comment, step]);
  }
  var new_project = new Project({
    userId: userId,
    projectName: projectName,
    category: category,
    projectStyle: projectStyle,
    album: album,
  });
  console.log (new_project);
  new_project.save(function(err) {
        if (err) {
          console.log('Project did not save');
        } else {
          console.log('Project saved successfully');
          res.redirect('/projects_list');
        }
      });

});

/* Login form */
router.get('/login', function(req, res){
  res.render('login');
});

router.post('/authenticate', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email:email}, function(err, user){
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
      res.redirect('/login');
    }
    else if (user) {

      bcrypt.compare(password, user.password, function(err, result) {
        if (!result) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          res.redirect('/login');
        }
        else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign({foo:'bar'}, config.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          res.cookie('Token', token);
          // return the information including token as JSON
          User.findOneAndUpdate({email: email}, {token: token}, function(err) {
            if (err) {
              console.log('got an error');
            }
          });
          res.redirect('/my_projects');
        }
      });
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
	var firstName = req.body.firstName;

  var new_user = new User({
        email: email,
        password: password1,
        firstName: firstName,
      });
  console.log(new_user);
  new_user.save(function(err) {
    if (err) {
      console.log('User did not save');
    } else {
      console.log('User saved successfully');
      var token = jwt.sign({foo:'bar'}, config.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
      res.cookie('Token', token);
      console.log('token: ',token);
      // return the information including token as JSON
      User.findOneAndUpdate({email: email}, {token: token}, function(err) {
        if (err) {
          console.log('got an error');
        }
      });
      res.redirect('/my_projects');
    }
  });
});

module.exports = router;

