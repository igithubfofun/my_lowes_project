var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
	var userID = req.body.userID;
	var name = req.body.projectName;
	var projectName = req.body.album;
	var category = req.body.category;

	var newProject = Project({
		userId: userID,
		projectName: projectName,
		category: category
	});

	newProject.save(function(err){
		if (err) console.log(err);

		res.redirect('/');
	});
});

module.exports = router;