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
var comma = "'";
/*
 * 
 * hhsa_san_diego_demographics_occupational_industry_2012
 * 
 */
var delphiDataQuery = ' \
SELECT industry."SRA", "Occupation - total all occupations" as total, \
("Industry - agriculture, forestry, mining" + "Industry - utilities" + "Industry - construction" +  "Industry - transportation, warehousing, and utilities") as industry, \
("Industry - wholesale trade" + "Industry - retail trade") as commercial, \
("Industry - information and communications") as communication, \
("Industry - finance, insurance, and real estate") as financial, \
("Industry - professional, scientific, management, administrative") as professional, \
("Industry - educational, social and health services") as social, \
("Industry - arts, entertainm, recreation, accommodat, food servi") as entertainment, \
employed, military, unemployed, english, spanish, asian, total_houses, median, college_student, uneducated, ged, community, university \
FROM hhsa_san_diego_demographics_occupational_industry_2012 as industry, (SELECT educ."Area", "Total owner occupied households" as total_houses, "Median house value" as median, "9th through 12th grade, no diploma (age>=25)" as uneducated, "High school graduate (include equivalency (age>=25))" as ged, ("Some college, no diploma (age>=25)" + "Associate' + comma + 's degree (age>=25)") as community, ("Bachelor' + comma + 's degree (age>=25)" + "Master' + comma + 's degree (age>=25)") as university,  \
"Population 25 and older" as total_educ, ("College undergraduate -total enrollment (age>=3)" + "Graduate or professional school -total enrollment (age>=3)" + "College undergraduate -private school enrollment (age>=3)" + "Grad or professional school -private school enrollment (age>=3)") as college_student \
FROM hhsa_san_diego_demographics_home_value_2012 as home, hhsa_san_diego_demographics_education_2012 as educ \
WHERE educ."Area" = home."Area") as educHome, (SELECT "SRA", "Total in labor force (residents)" as employed, "Total Armed Forces (residents)" as military, "Total not in labor force (residents)" as unemployed \
FROM hhsa_san_diego_demographics_employment_status_2012) as employ, (SELECT "SRA", "Area", "Speak only English (age>=5)" as english, "Speak Spanish -total (age>=5)" as spanish, "Speak API lang -total (age>=5)" as asian \
FROM hhsa_san_diego_demographics_languages_2012) as language \
WHERE educHome."Area" = industry."Area" AND employ."SRA" = industry."SRA" AND language."SRA" = industry."SRA" \
ORDER BY "SRA"';

/*
 * 
 * 
 * 
 */
var delphiMaxDataQuery = ' \
SELECT MAX("Industry - agriculture, forestry, mining" + "Industry - utilities" + "Industry - construction" +  "Industry - transportation, warehousing, and utilities") as industry, \
MAX("Industry - wholesale trade" + "Industry - retail trade") as commercial, \
MAX("Industry - information and communications") as communication, \
MAX("Industry - finance, insurance, and real estate") as financial, \
MAX("Industry - professional, scientific, management, administrative") as professional, \
MAX("Industry - educational, social and health services") as social, \
MAX("Industry - arts, entertainm, recreation, accommodat, food servi") as entertainment, \
MAX(employed/(unemployed+employed)::float) as employed, MAX(military) as military, MAX(unemployed/(unemployed+employed)::float) as unemployed, MAX(english) as english, MAX(spanish) as spanish, MAX(asian) as asian, MAX(total_houses) as total_houses, MAX(median) as median, MAX(college_student) as college_student, MAX(uneducated) as uneducated, MAX(ged) as ged, MAX(community) as community, MAX(university) as university \
FROM hhsa_san_diego_demographics_occupational_industry_2012 as industry, (SELECT educ."Area", "Total owner occupied households" as total_houses, "Median house value" as median, "9th through 12th grade, no diploma (age>=25)" as uneducated, "High school graduate (include equivalency (age>=25))" as ged, ("Some college, no diploma (age>=25)" + "Associate' + comma + 's degree (age>=25)") as community, ("Bachelor' + comma + 's degree (age>=25)" + "Master' + comma + 's degree (age>=25)") as university,  \
"Population 25 and older" as total_educ, ("College undergraduate -total enrollment (age>=3)" + "Graduate or professional school -total enrollment (age>=3)" + "College undergraduate -private school enrollment (age>=3)" + "Grad or professional school -private school enrollment (age>=3)") as college_student \
FROM hhsa_san_diego_demographics_home_value_2012 as home, hhsa_san_diego_demographics_education_2012 as educ \
WHERE educ."Area" = home."Area") as educHome, (SELECT "SRA", "Total in labor force (residents)" as employed, "Total Armed Forces (residents)" as military, "Total not in labor force (residents)" as unemployed \
FROM hhsa_san_diego_demographics_employment_status_2012) as employ, (SELECT "SRA", "Area", "Speak only English (age>=5)" as english, "Speak Spanish -total (age>=5)" as spanish, "Speak API lang -total (age>=5)" as asian \
FROM hhsa_san_diego_demographics_languages_2012) as language';

router.get('/getData', function(req, res) {
	var data = [];
	//Add new queries here
	queries = [ 
		{"name": "delphiData", "query": delphiDataQuery},
		{"name": "delphiMaxData", "query": delphiMaxDataQuery}		
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
