var MAP_DEFAULT_FILL_COLOR = "#000000";
//Border Color
var MAP_DEFAULT_COLOR = "#000000";
//Border Weight
var MAP_DEFAULT_WEIGHT = 1;

//Fill Color
var MAP_HIGHLIGHT_COLOR = "red";
var MAP_HIGHLIGHT_WEIGHT = 3;

var BAR_GRAPH_COLOR = "#556";

heatMapOptions = [ 
		//Percent Normal
		{"key": "college_student", "value": "college_student"},
		{"key": "median", "value": "median"},
		{"key": "english", "value": "English Speakers"},
		{"key": "spanish", "value": "Spanish Speakers"},
		{"key": "asian", "value": "Asian Speakers"},
		{"key": "professional", "value": "Professional Workers"},
		{"key": "entertainment", "value": "Entertainment Workers"},
		{"key": "financial", "value": "Financial Workers"},
		{"key": "social", "value": "Social Workers"},
		{"key": "communication", "value": "Communication Workers"},
		{"key": "commercial", "value": "Commercial Workers"},
		{"key": "industry", "value": "Industrial Workers"},
		{"key": "military", "value": "Military Citizens"},
		//
		{"key": "unemployed", "value": "Unemployed Citizens"},
		{"key": "employed", "value": "Employed Citizens"}
	];
	
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
	"employed": 2
};

colorList = (
	"#40d47e",
	"#3498db",
	"#9b59b6",
	"#e67e22",
	"#16a085",
	"#2980b9",
	"#e74c3c"
);