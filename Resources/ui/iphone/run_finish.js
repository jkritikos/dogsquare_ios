
function buildRunFinishView(coords){
	
var viewRunSummary = Ti.UI.createView({
	backgroundColor:'white'
});

var center = {latitude:coords[0][0],longitude:coords[0][1],latitudeDelta:0.03, longitudeDelta:0.1};

var viewRunSummaryMap = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: center,
    animate:true,
    regionFit:true
});

var pathCoordinates = [];
for(var i=0; i < coords.length; i++){
	pathCoordinates.push({latitude:coords[i][0], longitude:coords[i][1]});
}

// route object
var route = {
    name:"Your path",
    points:pathCoordinates,
    color:"#00f",
    width:3
};
 
// add a route
viewRunSummaryMap.addRoute(route);

viewRunSummary.add(viewRunSummaryMap);

return viewRunSummary;
}