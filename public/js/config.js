var MAP_DEFAULT_FILL_COLOR = "#000000";
//Border Color
var MAP_DEFAULT_COLOR = "#000000";
//Border Weight
var MAP_DEFAULT_WEIGHT = 1;

//Fill Color
var MAP_HIGHLIGHT_COLOR = "red";
var MAP_HIGHLIGHT_WEIGHT = 3;

var BAR_GRAPH_COLOR = "#556";

var EMPLOYED_BG_COLOR = "#2ecc71";
var UNEMPLOYED_BG_COLOR = "#9b59b6";
var MILITARY_BG_COLOR = "#e74c3c";

var DEFAULT_CHART = 'occupation';

$("#employed-legend").css('color',EMPLOYED_BG_COLOR);
$("#unemployed-legend").css('color',UNEMPLOYED_BG_COLOR);
$("#military-legend").css('color',MILITARY_BG_COLOR);

var calculateMethod = {
	"asian": 1,
	"english": 1, 
	"spanish": 1, 
	"professional": 1, 
	"entertainment": 1, 
	"industry": 1, 
	"military": 1,
	"college_student": 1, 
	"median": 1,
	"financial": 1,
	"social": 1,
	"communication": 1,
	"commercial": 1,
	"unemployed": 2, 
	"employed": 2,
	"uneducated": 1,
	"ged": 1,
	"community": 1,
	"university": 1
};

var colorList = [
	"#40d47e",
	"#3498db",
	"#9b59b6",
	"#e67e22",
	"#16a085",
	"#2980b9",
	"#e74c3c"
];

var dataName = {
	"college_student": "College Students",
	"median": "Median Home Value",
	"english": "English Speakers",
	"spanish": "Spanish Speakers",
	"asian": "Asian Speakers",
	"professional": "Professional Workers",
	"entertainment": "Entertainment Workers",
	"financial": "Financial Workers",
	"social": "Social Workers",
	"communication": "Communication Workers",
	"commercial": "Commercial Workers",
	"industry": "Industrial Workers",
	"military": "Military Citizens",
	"unemployed": "Unemployed Citizens",
	"employed": "Employed Citizens",
	"uneducated": "Uneducated Citizens",
	"ged": "High-school Graduates",
	"community": "Associate Graduates",
	"university": "University Graduates"
};

//Create a key-map version
var heatMapOptions = [];
for(var key in dataName) {
    heatMapOptions.push({"key": key, "value": dataName[this.key]})
}

var dataCategory = {};
dataCategory['occupation'] = ["professional", 
	"entertainment", 
	"industry",
	"financial",
	"social",
	"communication",
	"commercial"];

dataCategory['education'] = [
	"ged",
	"community",
	"university"
];