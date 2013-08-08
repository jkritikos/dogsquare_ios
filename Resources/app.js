Ti.Geolocation.purpose = "Retrieve user location";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST_FOR_NAVIGATION;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
Ti.Geolocation.distanceFilter = 10;

var openWindows = [];

//TMP DEBUG
var userObject = {
	name:'Jason',
	userId:1,
	dogId:1
}

//Left & center windows
Ti.include('ui/iphone/navigation.js');

window.add(loginWindow);
window.open(); //init the app


Ti.include('common/dao.js');
Ti.include('common/utils.js');

Ti.include('ui/iphone/run.js');
Ti.include('ui/iphone/map.js');

//test file upload
//var win11 = xhr_upload({title:'test'});
//win11.open();
