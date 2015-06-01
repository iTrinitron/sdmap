/* Load the database to a local variable */
//Local Database to store all variables
var localDB = [];
loadData();
var data;
var currentSRA;
var lastLayer = 0;

var vPane = new VerticalPane("#vertical-pane");


//Create Map
var map = L.map('map').setView([32.796968,-117.102807], 13);
addMapbox();
createLayer();
loadMap();

var myLayer;

function loadData() {
	$.ajax({
		dataType: "json",
		url: "db/language",
		success: function(data) {
			$(data).each(function(key, data) {
				if(localDB[data.SRA]) {
					localDB[data.SRA]["language"] = data
				}
				else {
					localDB[data.SRA] = [];
					localDB[data.SRA]["language"] = data
				}
			});
		}
	}).error(function() {}); 
	
	
	$.ajax({
		dataType: "json",
		url: "db/employment",
		success: function(data) {
			$(data).each(function(key, data) {
				if(localDB[data.SRA]) {
					localDB[data.SRA]["employment"] = data
				}
				else {
					localDB[data.SRA] = [];
					localDB[data.SRA]["employment"] = data
				}
			});
		}
	}).error(function() {}); 
}



function loadMap() {
	$.ajax({
		dataType: "json",
		url: "mapGeo/sandiego",
		success: function(data) {
			$(data.features).each(function(key, data) {

			//add data to map
				data.properties.selected = false;
				myLayer.addData(data);
			});

		}
	}).error(function() {}); 
}


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
	console.log(layer);
	lastLayer = layer;
}

function resetHighlight(e) {
	//console.log(e);
    myLayer.resetStyle(e.target);
}

//ASDFASD

function updateSort() {
//map.removeLayer(myLayer);
//myLayer.clea
//rLayers();
//change props
if(mapData.properties.name === "La Jolla") {
	mapData.properties.class = "B";
}


myLayer.addData(mapData);
console.log("About to print map data");
}

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


function addMapbox() {
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 18,
id: 'itrinitron.m79d7eg8',
accessToken: 'pk.eyJ1IjoiaXRyaW5pdHJvbiIsImEiOiJ6NGNZaXVBIn0.1dTPdhyoMAUHkjX9wVl4eQ'
}).addTo(map);
}

var myStyle = {
"color": "#ff7800",
"weight": 1,
"opacity": 0.65
};


function createLayer() {
	myLayer = L.geoJson(false, {
			style: function(feature) {
				switch (feature.properties.class) {
					case 'A': return {color: "#ff0000", weight: 1}; break;
					case 'B': return {color: "#00ff00", weight: 1}; break;
					default:   return {color: "#0000ff", weight: 1};
				}
			},
			onEachFeature: onEachFeature
		}
	).addTo(this.map);
}

/*
map.on('click', function(e) {        
var popLocation= e.latlng;
var popup = L.popup()
.setLatLng(popLocation)
.setContent('<p>Hello world!<br />This is a nice popup.</p>')
.openOn(map);        
}); */


// MY PERSONAL BAR LINE
//<div class="mini-bar"></div>
//console.log(localDB[sra]["employment"])

function boxUpdate() {
//Calculate the numbers
var e = localDB[currentSRA]["employment"].employed;
var ue  = localDB[currentSRA]["employment"].unemployed;
var m = localDB[currentSRA]["employment"].military;
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