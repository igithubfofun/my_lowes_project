var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
	var name = req.body.name;
	var email = req.body.email;

	var newUser = User({
		name: name,
		email: email
	});

	newUser.save(function(err){
		if (err) console.log(err);

		res.send('User created!');
	});
});

module.exports = router;
