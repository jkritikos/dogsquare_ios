//UI properties
var UI_COLOR = '#f9bf30';
var UI_BACKGROUND_COLOR = '#eeeded';
var UI_MENU_BACKGROUND_COLOR = '#252931';
var UI_COLOR_RUN = '#6a5b5b';
var UI_FONT_COLOR_LIGHT_BLACK = '#666666';
var UI_FONT_COLOR_LIGHT_GREY = '#8a8a8a';
var UI_FONT_REGULAR = {fontSize:25, fontWeight:'regular', fontFamily:'Open Sans'};
var UI_FONT_BOLD = {fontSize:25, fontWeight:'bold', fontFamily:'Open Sans'};
var UI_FONT_SEMIBOLD_NAVBAR = {fontSize:25, fontWeight:'semibold', fontFamily:'Open Sans'};
var UI_FONT_LEFTMENU = {fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'};
var UI_FONT_COLOR_TABLE = "#938787";

var IMAGE_PATH = 'images/iphone/';
//End UI properties

//Hack for reusing views within current or new window
var TARGET_MODE_REUSE = 1;
var TARGET_MODE_NEW_WINDOW = 2;

//Left & right menus
Ti.include('menu_left.js');
Ti.include('menu_right.js');

function closeOpenWindows(){
	Ti.API.info('closeOpenWindows() closed '+openWindows.length+' windows');
	for(var i=0; i < openWindows.length; i++){
		navController.close(openWindows[i], {animated:false});
	}
	openWindows = [];
}

////////////////////////////////////////////////
// CENTER MAIN WINDOW
var rightBtn = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/menu_dog.png',
	width:35,
	height:23
});

rightBtn.addEventListener("click", function(){
	window.toggleRightView();
	window.setCenterhiddenInteractivity("TouchEnabled");
});

var leftBtn = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/menu.png',
	width:38,
	height:18
});

leftBtn.addEventListener("click", function(){
	window.toggleLeftView();
	window.setCenterhiddenInteractivity("TouchEnabled");
});

var navController = createCenterNavWindow();

function createCenterNavWindow(){	
	var win = Ti.UI.createWindow({
		backgroundColor:'#eee',
		title:"Napp Slide Menu",
		barColor:UI_COLOR,
		barImage:IMAGE_PATH+'common/bar.png'
	});
	
	win.leftNavButton = leftBtn;
	win.rightNavButton = rightBtn;
	
	//NAV
	var navController = Ti.UI.iPhone.createNavigationGroup({
		window : win
	});
	
	//If we have a persisted user, load the profile view
	if(userObject.userId){
		Ti.include('profile.js');
		navController.getWindow().add(viewProfile);
		navController.getWindow().setTitle(userObject.name);
	}
	
	return navController;
}


////////////////////////////////////////////////
// NappSlideMenu WINDOW
var NappSlideMenu = require('dk.napp.slidemenu');

var window = NappSlideMenu.createSlideMenuWindow({
	centerWindow: navController,
	leftWindow:winLeft,
	rightWindow:winRight,
	leftLedge:65,
	rightLedge:43
});

Ti.include('initial.js');