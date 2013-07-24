Ti.Geolocation.purpose = "Retrieve user location";
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
Ti.Geolocation.distanceFilter = 10;

var openWindows = [];

////////////////////////////////////////////////
//LEFT WINDOW
Ti.include('ui/iphone/navigation.js');
////////////////////////////////////////////////


////////////////////////////////////////////////
// CENTER MAIN WINDOW
var navController = createCenterNavWindow();
////////////////////////////////////////////////

////////////////////////////////////////////////


function createCenterNavWindow(){	
	var win = Ti.UI.createWindow({
		backgroundColor:'#eee',
		title:"Napp Slide Menu",
		barColor:"#000"
	});
	var leftBtn = Ti.UI.createButton({title:"Menu"});
	leftBtn.addEventListener("click", function(){
		window.toggleLeftView();
		window.setCenterhiddenInteractivity("TouchEnabled");
	});
	
	win.leftNavButton = leftBtn;
	
	//NAV
	var navController = Ti.UI.iPhone.createNavigationGroup({
		window : win
	});
	
	return navController;
}


////////////////////////////////////////////////
// NappSlideMenu WINDOW
var NappSlideMenu = require('dk.napp.slidemenu');

var window = NappSlideMenu.createSlideMenuWindow({
	centerWindow: navController,
	leftWindow:winLeft,
	//rightWindow:winRight,
	leftLedge:150
});

window.setParallaxAmount(0.3);

var loginWindow = Ti.UI.createWindow({
	backgroundColor:'green',
	title:'login'
});

var closeButton = Ti.UI.createButton({
	title:'close',
});
			
loginWindow.add(closeButton);
			
closeButton.addEventListener('click', function(){
	loginWindow.animate({opacity:0, duration:250}, function(){
		window.remove(loginWindow);
	});
	
});

var registerButton = Ti.UI.createButton({
	title:'Register',
	bottom:30
});

loginWindow.add(registerButton);

registerButton.addEventListener('click', function(){
	var w = Ti.UI.createWindow({
		backButtonTitle:'back',
		title:'register',
		backgroundColor:'red'
	});
	
	var registerCloseButton = Ti.UI.createButton({
		title:'close',
		bottom:30
	});
	
	w.add(registerCloseButton);
	
	registerCloseButton.addEventListener('click', function(){
		w.close();
	});
	
	loginWindow.add(w);
	w.open();
});

var loginButton = Ti.UI.createButton({
	title:'Login',
	top:40
});

loginWindow.add(loginButton);

window.add(loginWindow);
window.open(); //init the app


Ti.include('ui/iphone/run.js');
