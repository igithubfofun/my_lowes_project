var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project')

/* GET project listing. */
router.get('/', function(req, res, next) {
  res.render('my_projects');
});

router.get('/new', function(req, res, next) {
	res.render('new');
})


router.post('/new', function(req, res, next){
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
	});
	res.redirect('/');
});


module.exports = router;