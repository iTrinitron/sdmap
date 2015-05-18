var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs'); /* JSON fs parse */




/* GET users listing. */
router.get('/sandiego', function(req, res, next) {
	var file = __dirname + '/sandiego.json';
	
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}

		data = JSON.parse(data);

		res.json(data);
	});
});

router.get('/india', function(req, res, next) {
	var file = __dirname + '/india.json';
	
	fs.readFile(file, 'utf8', function (err, data) {
		if (err) {
			console.log('Error: ' + err);
			return;
		}

		data = JSON.parse(data);

		res.json(data);
	});
});

module.exports = router;
