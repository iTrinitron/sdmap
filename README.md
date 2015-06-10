# sdmap

<b>Install Dependencies</b><br/>
npm install 

<b>Run Server</b><br/>
DEBUG=todoApp ./bin/www

<b>Landing Page</b><br/>
localhost:3000/map


var educHomeIndustryQuery = ' \
SELECT industry."SRA", "Occupation - total all occupations" as total, \
("Industry - agriculture, forestry, mining" + "Industry - utilities" + "Industry - construction" +  "Industry - transportation, warehousing, and utilities") as industry, \
("Industry - wholesale trade" + "Industry - retail trade") as commercial, \
("Industry - information and communications") as communication, \
("Industry - finance, insurance, and real estate") as financial, \
("Industry - professional, scientific, management, administrative") as professional, \
("Industry - educational, social and health services") as social, \
("Industry - arts, entertainm, recreation, accommodat, food servi") as entertainment, \
employed, military, unemployed, english, spanish, asian, total_houses, median \

FROM 

hhsa_san_diego_demographics_occupational_industry_2012 as industry, 

(SELECT educ."Area", 
"Total owner occupied households" as total_houses, 
"Median house value" as median, 
"9th through 12th grade, no diploma (age>=25)" as uneducated, 
"High school graduate (include equivalency (age>=25))" as ged, 
("Some college, no diploma (age>=25)" + "Associate' + comma + 's degree (age>=25)") as community, 
("Bachelor' + comma + 's degree (age>=25)" + "Master' + comma + 's degree (age>=25)") as university,  \
"Population 25 and older" as total_educ, 
("College undergraduate -total enrollment (age>=3)" + "Graduate or professional school -total enrollment (age>=3)" + "College undergraduate -private school enrollment (age>=3)" + "Grad or professional school -private school enrollment (age>=3)") as college_student \
FROM hhsa_san_diego_demographics_home_value_2012 as home, hhsa_san_diego_demographics_education_2012 as educ \
WHERE educ."Area" = home."Area") as educHome,

(SELECT "SRA", "Total in labor force (residents)" as employed, "Total Armed Forces (residents)" as military, "Total not in labor force (residents)" as unemployed \
FROM hhsa_san_diego_demographics_employment_status_2012) as employ, 

(SELECT "SRA", "Area", "Speak only English (age>=5)" as english, "Speak Spanish -total (age>=5)" as spanish, "Speak API lang -total (age>=5)" as asian \
FROM hhsa_san_diego_demographics_languages_2012) as language 
\
WHERE educHome."Area" = industry."Area" AND employ."SRA" = industry."SRA" AND language."SRA" = industry."SRA" \
ORDER BY "SRA"';


var educHomeIndustryQuery = ' \
SELECT industry."SRA", "Occupation - total all occupations" as total, \
("Industry - agriculture, forestry, mining" + "Industry - utilities" + "Industry - construction" +  "Industry - transportation, warehousing, and utilities") as industry, \
("Industry - wholesale trade" + "Industry - retail trade") as commercial, \
("Industry - information and communications") as communication, \
("Industry - finance, insurance, and real estate") as financial, \
("Industry - professional, scientific, management, administrative") as professional, \
("Industry - educational, social and health services") as social, \
("Industry - arts, entertainm, recreation, accommodat, food servi") as entertainment, \
employed, military, unemployed, english, spanish, asian, total_houses, median \
FROM hhsa_san_diego_demographics_occupational_industry_2012 as industry, (SELECT educ."Area", "Total owner occupied households" as total_houses, "Median house value" as median, "no diploma (age>=25)" as uneducated, "High school graduate (include equivalency (age>=25))" as ged, ("Some college, no diploma (age>=25)" + "Associate' + comma + 's degree (age>=25)") as community, (Bachelor' + comma + 's degree (age>=25)" + Master' + comma + 's degree (age>=25)) as university,  \
"Population 25 and older" as total_educ, ("College undergraduate -total enrollment (age>=3)" + "Graduate or professional school -total enrollment (age>=3)" + "College undergraduate -private school enrollment (age>=3)" + "Grad or professional school -private school enrollment (age>=3)") as college_student \
FROM hhsa_san_diego_demographics_home_value_2012 as home, hhsa_san_diego_demographics_education_2012 as educ \
WHERE educ."Area" = home."Area") as educHome, (SELECT "SRA", "Total in labor force (residents)" as employed, "Total Armed Forces (residents)" as military, "Total not in labor force (residents)" as unemployed \
FROM hhsa_san_diego_demographics_employment_status_2012) as employ, (SELECT "SRA", "Area", "Speak only English (age>=5)" as english, "Speak Spanish -total (age>=5)" as spanish, "Speak API lang -total (age>=5)" as asian \
FROM hhsa_san_diego_demographics_languages_2012) as language \
WHERE educHome."Area" = industry."Area" AND employ."SRA" = industry."SRA" AND language."SRA" = industry."SRA" \
ORDER BY "SRA"';