/*
 * 
 * URL: /db
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');

/*
 * Server Credentials
 */
var user = "wic";
var pw= "m0kei3u$jh*_2";
var server= "delphidata.ucsd.edu";
var port= "5432";
var db= "delphibetadb";
//Connection String
var conString = "postgres://" + user + ":" + pw + "@" + server + "/" + db;

/*
 * hhsa_san_diego_demographics_languages_2012
 * 
 */
var languageQuery = ' \
SELECT "SRA", "Area", "Speak only English (age>=5)" as english, "Speak Spanish -total (age>=5)" as spanish, "Speak API lang -total (age>=5)" as asian \
FROM hhsa_san_diego_demographics_languages_2012 ORDER BY "SRA"';

/*
 * hhsa_san_diego_demographics_employment_status_2012
 * 
 */
var employQuery = ' \
SELECT "SRA", "Total in labor force (residents)" as employed, "Total Armed Forces (residents)" as military, "Total not in labor force (residents)" as unemployed \
FROM hhsa_san_diego_demographics_employment_status_2012 ORDER BY "SRA"';

router.get('/getData', function(req, res) {
	var data = [];
	//Add new queries here
	queries = [ 
		{"name": "langauge", "query": languageQuery},
		{"name": "employment", "query": employQuery}
	];
	queryDBHelper(queries);
	
	function queryDBHelper(queries) {
		console.log("Executing " + queries.length + " queries");
		var queryData = {};
		if(queries.length > 0) {
			queryDB(queries, queryData, 0);
		}
	}
	/*
	* 
	* Generic query
	*/
	function queryDB(queries, queryData, i) {
		console.log("Starting query: " + i);
		console.log(queries[i]['query']);
		pg.connect(conString, function(err, client, done) {
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			client.query(queries[i]['query'], function(err, result) {
				//call `done()` to release the client back to the pool
				done();

				if(err) {
					return console.error('error running query', err);
				}

				console.log("Finishing a query");
				queryData[queries[i++]['name']] = result.rows;
				if(i < queries.length) {
					queryDB(queries, queryData, i);
				}
				else {
					res.json(queryData);
				}
			});
		});
	}
});

module.exports = router;
