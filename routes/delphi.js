/*
 * 
 * URL: /db
 */

var express = require('express');
var router = express.Router();
var pg = require('pg');

var user = "wic";
var pw= "m0kei3u$jh*_2";
var server= "delphidata.ucsd.edu";
var port= "5432";
var db= "delphibetadb";

var conString = "postgres://" + user + ":" + pw + "@" + server + "/" + db;

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

/*
 * hhsa_san_diego_demographics_languages_2012
 * 
 */
var query = ' \
SELECT "SRA", "Area", "Speak only English (age>=5)" as english, "Speak Spanish -total (age>=5)" as spanish, "Speak API lang -total (age>=5)" as asian \
FROM hhsa_san_diego_demographics_languages_2012 ORDER BY "SRA"';

/*
 * hhsa_san_diego_demographics_employment_status_2012
 * 
 */
var employQuery = ' \
SELECT "SRA", "Total in labor force (residents)" as employed, "Total Armed Forces (residents)" as military, "Total not in labor force (residents)" as unemployed \
FROM hhsa_san_diego_demographics_employment_status_2012 ORDER BY "SRA"';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
 * URL: /db/employment
 */
router.get('/language', function(req, res) {
	pg.connect(conString, function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query(query, function(err, result) {
		//call `done()` to release the client back to the pool
		done();

		if(err) {
		  return console.error('error running query', err);
		}
		res.json(result.rows);
		//output: 1
	  });
	});
});

/*
 * URL: /db/employment
 */
router.get('/employment', function(req, res) {
	pg.connect(conString, function(err, client, done) {
	  if(err) {
		return console.error('error fetching client from pool', err);
	  }
	  client.query(employQuery, function(err, result) {
		//call `done()` to release the client back to the pool
		done();

		if(err) {
		  return console.error('error running query', err);
		}
		res.json(result.rows);
		//output: 1
	  });
	});
});

module.exports = router;
