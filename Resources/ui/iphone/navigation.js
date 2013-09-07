//UI properties
var UI_COLOR = '#f9bf30';
var UI_BACKGROUND_COLOR = '#eeeded';
var UI_MENU_BACKGROUND_COLOR = '#252931';
var UI_COLOR_RUN = '#6a5b5b';
var UI_FONT_REGULAR = {fontSize:25, fontWeight:'regular', fontFamily:'Open Sans'};
var UI_FONT_BOLD = {fontSize:25, fontWeight:'bold', fontFamily:'Open Sans'};
var UI_FONT_SEMIBOLD_NAVBAR = {fontSize:25, fontWeight:'semibold', fontFamily:'Open Sans'};
var UI_FONT_LEFTMENU = {fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'};

var IMAGE_PATH = 'images/iphone/';
//End UI properties

//Left & right menus
Ti.include('menu_left.js');
Ti.include('menu_right.js');

//Various views
var currentDogView = null;
var VIEW_SIGNUP = 1;


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

var navController = createCenterNavWindow();

function createCenterNavWindow(){	
	var win = Ti.UI.createWindow({
		backgroundColor:'#eee',
		title:"Napp Slide Menu",
		barColor:UI_COLOR,
		barImage:IMAGE_PATH+'common/bar.png'
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
	
	win.leftNavButton = leftBtn;
	win.rightNavButton = rightBtn;
	
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
	rightWindow:winRight,
	leftLedge:65,
	rightLedge:43
});

Ti.include('login.js');