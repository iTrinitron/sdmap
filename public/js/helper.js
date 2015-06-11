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
			localDB['max'] = data['delphiMaxData'][0];
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
	$(".leaflet-bottom").remove(); //ADD THIS LICENSE BACK IN SOMEWHERE
}

/*
 * Generate the layer to place on the Map, and return the layer
 */ 
function createLayer() {
	return L.geoJson(false, {
			style: function(feature) {
				switch (feature.properties.class) {
					default:   return {
							fillColor: MAP_DEFAULT_FILL_COLOR,
							color: MAP_DEFAULT_COLOR, 
							weight: MAP_DEFAULT_WEIGHT
					};
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

function resetHeatMap() {
	myLayer.eachLayer(function(layer) {
		myLayer.resetStyle(layer);
	});
}


/*
 * Recolors the map according to a specific column's heat
 */
function updateHeat(col) {
	myLayer.eachLayer(function(layer) {
		layer.setStyle({
			fillOpacity: calculatePercent(col, layer.feature.properties.SRA)
		});
	});
}

/*
 * Calculate percentage for the heat map intensity
 */
function calculatePercent(col, sra) {
	var percent = 0;
	switch(calculateMethod[col]) {
		case 2: 
			percent = localDB[sra][col] / (localDB[sra]['unemployed']+localDB[sra]['employed']) / (localDB['max'][col] * 1.2);
			break;
		default:
			percent = localDB[sra][col] / (localDB['max'][col]*1.2);
			break;
	}
	

	return round(percent, 2);
}


/*
 * Highlight a selected SRA 
 */
function highlightSRA(e) {
	if(lastLayer !== 0) {
		resetStyle(lastLayer);
	}
	
	var layer = e.target;

	layer.setStyle({
			weight: MAP_HIGHLIGHT_WEIGHT,
			color: MAP_HIGHLIGHT_COLOR
	});

	if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
	}
	lastLayer = layer;
}

function resetStyle(layer) {
	layer.setStyle({
			weight: MAP_DEFAULT_WEIGHT,
			color: MAP_DEFAULT_COLOR
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

/*
 * Function called every time data is added to the map
 */
function onEachFeature(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.name) {
		//layer.bindPopup(feature.properties.name);
		
		//Bind the features to the onclick function
		layer.on("click", function (e) {
			mapOnClick(feature);
			highlightSRA(e);
		}); 
	}
}

var selectedChart = DEFAULT_CHART;
console.log(selectedChart);
/*
 * Separates a number into the US comma format
 */
function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

$('#chart-selector span').click(function() {
	//Reset
	$('#chart-selector span').css('font-weight', 'normal');
	$(this).css('font-weight', 'bold');
	selectedChart = $(this).attr('id');
	generateBarHelper();
});

/*
 * Process the data required to genereate the bar graph
 */
function generateBarHelper() {
	var n = 1; //Number of layers in the stacked bar graph
	//Array of columns from localDB
	console.log(selectedChart);
	var cols = dataCategory[selectedChart];
	//Number of Columns
	var m = cols.length;
	var legend = []
	//Iterate and create the array
	var datum = [];
	for(var i=0; i<n; ++i) {
		datum[i] = [];
		for(var j=0; j<m; ++j) {
			datum[i].push({"x": j, "y": localDB[currentSRA][cols[j]]});
			legend.push(dataName[cols[j]]);
		}
	}
	
	console.log(legend);
	
	generateBar(n, m, datum, legend);
}


	/*
	return customArray = [
					[
					{"x": 0, "y": 4},
	{"x": 1, "y": 4},
	{"x": 2, "y": 5},
	{"x": 3, "y": 6}],
		[
					{"x": 0, "y": 4},
	{"x": 1, "y": 5},
	{"x": 2, "y": 6},
	{"x": 3, "y": 7}
		]]; */
