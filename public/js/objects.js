/*
 * Class for the Right Pane
 */
function VerticalPane(id) {
	this.id = id;
	this.rName = "Region Name";
	
	this.updateRName = function(name) {
		this.rName = name;
		$(id + " #name").html(name);
	};
}