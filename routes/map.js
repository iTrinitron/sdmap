var express = require('express');
var router = express.Router();
var path = require("path");

/* GET users listing. */
router.get('/', function(req, res, next) {
	//Send the HTML file on access
	res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router;
