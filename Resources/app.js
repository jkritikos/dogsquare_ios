Ti.API.info('debug 3');

Ti.Geolocation.purpose = "Retrieve user location";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST_FOR_NAVIGATION;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
Ti.Geolocation.distanceFilter = 10;

var openWindows = [];

//TMP DEBUG
/*
var userObject = {
	name:'Jason',
	email:'',
	image_path:null,
	thumb_path:null,
	age:0,
	facebook_id:null,
	gender:null,
	followers:0,
	following:0,
	inbox:0,
	userId:1,
	dogId:1
};*/
Ti.include('common/dao.js');

var userObject = getUserObject();

//DEBUG STUFF
createDB();

Ti.include('common/utils.js');
Ti.include('common/translator.js');

//Left & center windows
Ti.include('ui/iphone/navigation.js');
//Progress view component
Ti.include("modules/progress.view.js");

window.add(initialWindow);
window.open(); //init the app
window.setParallaxAmount(0.3);

Ti.include('ui/iphone/run.js');

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