/*
 * Make an AJAX call to grab the data
 */
function loadData() {
	$.ajax({
		dataType: "json",
		url: "db/getData",
		success: function(data) {
			//Populate the local DB with each SRA's data
			$(data['delphiData']).each(function(key, row) {
				localDB[row["SRA"]] = row
			});
			localDB['max'] = data['delphiMaxData'][0];l
		}
	}).error(function() {}); 
}

/*
 * Make an AJAX call to grab the coordinates / names / SRA of regions
 */ 
function loadMap() {
	$.ajax({
		dataType: "json",
		url: "mapGeo/sandiego",
		success: function(data) {
			$(data.features).each(function(key, data) {
				myLayer.addData(data);
			});

		}
	}).error(function() {}); 
}

/*
 * Make an AJAX call to grab the MapBox API 
 */
function addMapbox() {
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'itrinitron.m79d7eg8',
		accessToken: 'pk.eyJ1IjoiaXRyaW5pdHJvbiIsImEiOiJ6NGNZaXVBIn0.1dTPdhyoMAUHkjX9wVl4eQ'
	}).addTo(map);
}

/*
 * Generate the layer to place on the Map, and return the layer
 */ 
function createLayer() {
	return L.geoJson(false, {
			style: function(feature) {
				switch (feature.properties.class) {
					case 'A': return {color: "#ff0000", weight: 1}; break;
					case 'B': return {color: "#00ff00", weight: 1}; break;
					default:   return {color: "#0000ff", weight: 1};
				}
			},
			onEachFeature: onEachFeature
		}
	)
}

/*
 * Round a function 
 */
function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

/*
 * When the Update Map button is clicked 
 */
function updateMapClick() {
	updateHeat($('#heat').val());
}


/*
 * Recolors the map according to a specific column's heat
 */
function updateHeat(col) {
	myLayer.eachLayer(function(layer) {
		var sra = layer.feature.properties.SRA
		var percent = localDB[sra][col] / localDB['max'][col];
		console.log(localDB['max'][col]);
		console.log(percent);
		percent = round(percent, 2);
		
		layer.setStyle({
			fillOpacity: percent
		});
	});
}

/*
 *http://stackoverflow.com/questions/170986/what-is-the-best-way-to-add-options-to-a-select-from-an-array-with-jquery 
 sum ting wong
 */
function addHeatOptions(options) {

	$.each(options, function(key, value) {   

     $('#heat')
         .append($("<option></option>")
         .attr("value",value['key'])
         .text(value['value'])); 
	});
}