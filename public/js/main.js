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


addHeatOptions(heatMapOptions);


loadMap();

var geomjsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-117.238,32.881]
    }
};

L.geoJson(geomjsonFeature).addTo(map);
var geomjsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-117.072222,32.775278]
    }
};

L.geoJson(geomjsonFeature).addTo(map);
var geomjsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-117.1875,32.771111]
    }
};

L.geoJson(geomjsonFeature).addTo(map);



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


function resetHighlight(e) {
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










// MY PERSONAL BAR LINE
//<div class="mini-bar"></div>

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
	
	if(w1+w2+w3 < 100) {
		w3++;
	}
	


	$('#hor-bar').html(' \
	<div class="mini-bar" style=" width: ' + w1 + '%; background: ' + EMPLOYED_BG_COLOR + ';"></div> \
	<div class="mini-bar" style=" width: ' + w2 + '%; background: ' + UNEMPLOYED_BG_COLOR + ';"></div> \
	<div class="mini-bar" style=" width: ' + w3 + '%; background: ' + MILITARY_BG_COLOR + ';"></div> \
	');
	
	//Add in the median house value
	if(localDB[currentSRA]["median"] !== null) {
		$("#home-value").html(commaSeparateNumber(localDB[currentSRA]["median"]));
	}
	
	generateBarHelper();
}