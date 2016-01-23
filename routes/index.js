var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project')
var mongoose = require('mongoose');

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* My projects page */
router.get('/my_projects', function(req, res){
  Project.find({}, function(err, projects){
    projects_length = projects.length;
    res.render('my_projects', {projects_length: projects_length});
  });
});

module.exports = router;
