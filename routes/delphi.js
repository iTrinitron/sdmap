var express = require('express');
var router = express.Router();
var pg = require('pg');

var user = "wic";
var pw= "l03jven/?iwk+";
var server= "delphidata.ucsd.edu";
var port= "5432";
var db= "delphibetadb";

var conString = "postgres://" + user + ":" + pw + "@" + server + ":" + port + "/" + db;

//this starts initializes a connection pool
//it will keep idle connections open for a (configurable) 30 seconds
//and set a limit of 20 (also configurable)
pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool
    done();

    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
