var viewMap = Ti.UI.createView({
	backgroundColor:'white'
});

var mapWebView = Ti.UI.createWebView({
	url:'/web/m.html',
	top:30,
	height:200
});

var mapLabel = Ti.UI.createLabel({
	text:'map'
});

var mapCheckInButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'map/pin_checkIn.png',
	bottom:0,
	width:70,
	height:70,
	zIndex:2
});


viewMap.add(mapCheckInButton);
viewMap.add(mapLabel);

mapCheckInButton.addEventListener('click', function(){
	
	/*var checkinWindow = Ti.UI.createWindow({
		url:'ui/iphone/checkin.js',
		backgroundColor:'red',
		barColor:'#28292c',
		title:'Check in',
		backButtonTitle:'Back'
	});*/
	
	Ti.include('ui/iphone/checkin.js');
	
	openWindows.push(checkinWindow);
	navController.open(checkinWindow);
});



var center = {latitude:42.30,longitude:-71.18,latitudeDelta:0.03, longitudeDelta:0.1};
 
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: center,
    animate:true,
    regionFit:true
});
 
points = [
    {latitude:42.31,longitude:-71.11},
    {latitude:42.32,longitude:-71.13},
    {latitude:42.31,longitude:-71.22},
    {latitude:42.28,longitude:-71.26}
]
 
// route object
var route = {
    name:"some name",
    points:points,
    color:"#00f",
    width:3
};
 
// add a route
mapview.addRoute(route);



viewMap.add(mapview);
//Ti.UI.currentWindow.add(viewMap);