Ti.API.info('debug iOS7');

Ti.Geolocation.purpose = "Retrieve user location";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST_FOR_NAVIGATION;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
Ti.Geolocation.distanceFilter = 10;

//holds the window stack
var openWindows = [];
//holds global timers for various async tasks
var timers = [];

Ti.include('common/dao.js');

var userObject = getUserObject();

//Create the database
createDB();

Ti.include('ui/iphone/login.js');
Ti.include('common/utils.js');
Ti.include('common/translator.js');
//Progress view component
Ti.include("modules/progress.view.js");
//Date manipulations
//var momentModule = require('modules/moment.min');
//Local notifications
var notifyModule = require('bencoding.localnotify');
//SMS module
var smsModule = require("com.omorandi");
//Left & center windows
Ti.include('ui/iphone/navigation.js');

//Show the initial screen if no user object is persisted
if(!userObject.userId){
	//window.add(initialWindow);
	initialWindow.open();
} else {
	window.open(); //init the app
	window.setParallaxAmount(0.3);
}

Ti.include('ui/iphone/run.js');

var testDate = new Date();
Ti.API.warn(testDate + ' is ' + testDate.getTimezoneOffset() + ' minutes from Local');
