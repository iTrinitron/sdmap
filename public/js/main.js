/* Load the database to a local variable */
//Local Database to store all variables
var localDB = [];
loadData();

//Current SRA that is selected
var currentSRA;

//Create Map
var map = L.map('map').setView([32.796968,-117.102807], 13);
addMapbox();

var myLayer = createLayer();
myLayer.addTo(this.map);


var lastLayer = 0;

var vPane = new VerticalPane("#vertical-pane");

options = [ 
		{"key": "college_student", "value": "college_student"},
		{"key": "median", "value": "median"}
	];
addHeatOptions(options);


loadMap();







/*
 * 
 * I have to make all of my data changes in the ajax success -- apply all postgres then
 * I cannot create a local storage of the mapdata or else GG no re
 * -- system dies
 * 
 */

/*
 * mapOnClick
 * 
 * When you click a layer on the map...
 */
function mapOnClick(feature) {
	var name = feature.properties.name;
	var sra = feature.properties.SRA;
	
	vPane.updateRName(name);
	currentSRA = sra;
	boxUpdate();
	pieUpdate();
}

//I DONT even know anymore T_T
function highlightSRA(e) {
	console.log(e.target);
	if(lastLayer !== 0) {
		myLayer.resetStyle(lastLayer);
	}
	
	var layer = e.target;

	layer.setStyle({
			weight: 5,
			color: 'blue',
			dashArray: '',
			fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
	}
	lastLayer = layer;
}

function resetHighlight(e) {
	//console.log(e);
    myLayer.resetStyle(e.target);
}

//ASDFASD



function addData(data) {
//showMapData();
myLayer.addData(data);
}

function addStyle(feature) {
var arraySize = Math.ceil(Math.random()*8);
var fillColor = "#ff000" + arraySize;
return { "weight": 1, "color": fillColor};
}
//popup = new L.Popup();

function onEachFeature(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.name) {
		layer.bindPopup(feature.properties.name);
		//Bind the features to the onclick function
	
		layer.on("click", function (e) {
			mapOnClick(feature);
			highlightSRA(e);
		}); 
	}
}




var myStyle = {
"color": "#ff7800",
"weight": 1,
"opacity": 0.65
};





// MY PERSONAL BAR LINE
//<div class="mini-bar"></div>
//console.log(localDB[sra]["employment"])

function boxUpdate() {
//Calculate the numbers
var e = localDB[currentSRA].employed;
var ue  = localDB[currentSRA].unemployed;
var m = localDB[currentSRA].military;
total = e + ue + m;

//employed, military, unemployed
w1 = Math.ceil(e/total * 100);
w2 = Math.floor(m/total * 100); 
w3 = Math.floor(ue/total * 100);

console.log(total);

b1 = "#2ecc71";
b2 = "#9b59b6";
b3 = "#e74c3c";

$('#hor-bar').html(' \
<div class="mini-bar" style=" width: ' + w1 + '%; background: ' + b1 + ';"></div> \
<div class="mini-bar" style=" width: ' + w2 + '%; background: ' + b2 + ';"></div> \
<div class="mini-bar" style=" width: ' + w3 + '%; background: ' + b3 + ';"></div> \
');

}