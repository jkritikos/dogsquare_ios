var viewMap = Ti.UI.createView({
	backgroundColor:'white'
});

var mapWebView = Ti.UI.createWebView({
	url:'/web/map.html',
	top:0,
	height:200
});

var mapLabel = Ti.UI.createLabel({
	text:'map'
});

var mapCheckInButton = Ti.UI.createButton({
	title:'Check In',
	bottom:20,
	zIndex:2
});

viewMap.add(mapCheckInButton);
viewMap.add(mapLabel);

mapCheckInButton.addEventListener('click', function(){
	
	var checkinWindow = Ti.UI.createWindow({
		url:'ui/iphone/checkin.js',
		backgroundColor:'red',
		barColor:'#28292c',
		title:'Check in',
		backButtonTitle:'Back'
	});
	
	openWindows.push(checkinWindow);
	navController.open(checkinWindow);
});

viewMap.add(mapWebView);
//Ti.UI.currentWindow.add(viewMap);