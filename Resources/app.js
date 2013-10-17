Ti.API.info('debug 3');

Ti.Geolocation.purpose = "Retrieve user location";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST_FOR_NAVIGATION;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
Ti.Geolocation.distanceFilter = 10;

var openWindows = [];


Ti.include('common/dao.js');

var userObject = getUserObject();

//Create the database
createDB();

Ti.include('ui/iphone/login.js');
Ti.include('common/utils.js');
Ti.include('common/translator.js');
//Progress view component
Ti.include("modules/progress.view.js");
//Left & center windows
Ti.include('ui/iphone/navigation.js');

//Show the initial screen if no user object is persisted
if(!userObject.userId){
	window.add(initialWindow);
} else {
	Titanium.UI.iPhone.showStatusBar();
}

window.open(); //init the app
window.setParallaxAmount(0.3);

Ti.include('ui/iphone/run.js');

/*
var notify = require('bencoding.localnotify');
notify.scheduleLocalNotification({
    alertBody:"notification 1",
    alertAction:"Just a test",
    userInfo:{"id":1,"hello":"world"},
    date:new Date(new Date().getTime() + 10000) 
});

notify.scheduleLocalNotification({
    alertBody:"notification 2",
    alertAction:"Just a test",
    userInfo:{"id":1,"hello":"world"},
    date:new Date(new Date().getTime() + 15000) 
});
*/