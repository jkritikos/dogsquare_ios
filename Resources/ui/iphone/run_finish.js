
function buildRunFinishView(coords){

//Ti.API.info('Map set to lat '+coords[0].latitude+' and lon '+coords[0].longitude);
	
var viewRunSummary = Ti.UI.createView({
	backgroundColor:'black'
});

/*
//var center = {latitude:coords[0][0],longitude:coords[0][1],latitudeDelta:0.001, longitudeDelta:0.001,animate:true};
var region={
	latitude: coords[0].latitude,
	longitude: coords[0].longitude,
	animate:true,
	latitudeDelta:0.001,
	longitudeDelta:0.001
};


var viewRunSummaryMap = Titanium.Map.createView({
	width:'100%',
	bottom:0,
    mapType:Titanium.Map.STANDARD_TYPE,
    animate:true,
    regionFit:true,
    userLocation:true,
    visible:true
});

var pathCoordinates = [];
for(var i=0; i < coords.length; i++){
	pathCoordinates.push({latitude:coords[i][0], longitude:coords[i][1]});
}

// route object
var route = {
    name:"Your path",
    points:pathCoordinates,
    color:"green",
    borderColor:'black',
    width:12
};
 
// add a route
//viewRunSummaryMap.addRoute(route);

viewRunSummary.add(viewRunSummaryMap);
viewRunSummaryMap.setLocation(region);

Ti.API.info('Set location to '+region.latitude +' delta '+region.latitudeDelta);
*/
return viewRunSummary;
}