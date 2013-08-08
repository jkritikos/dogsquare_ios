//UI properties
var UI_COLOR = '#f9bf30';
var UI_BACKGROUND_COLOR = '#eeeded';
var UI_FONT_REGULAR = {fontSize:25, fontWeight:'regular', fontFamily:'Open Sans'};
var UI_FONT_BOLD = {fontSize:25, fontWeight:'bold', fontFamily:'Open Sans'};
var UI_FONT_SEMIBOLD_NAVBAR = {fontSize:25, fontWeight:'semibold', fontFamily:'Open Sans'};
var UI_FONT_LEFTMENU = {fontSize:15, fontWeight:'regular', fontFamily:'Open Sans'};

var IMAGE_PATH = 'images/iphone/';
//End UI properties

//Menu constants
var MENU_HOME = 0;
var MENU_PROFILE = 1;
var MENU_MAP = 2;
var MENU_GALLERY = 3;
var MENU_INBOX = 4;
var MENU_PASSPORT = 5;
var MENU_FIND_FRIENDS = 6;
var MENU_SETTINGS = 7;

//Left window
var winLeft = Ti.UI.createWindow();

//Left window menu
var leftTableView = Ti.UI.createTableView({
	backgroundColor:'#252931',
	font:UI_FONT_LEFTMENU,
	rowHeight:40,
	data:[{title:'Home'},{title:'Profile'}, {title:'Map'}, {title:'Gallery'}, {title:'Inbox'}, {title:'Passport'},{title:'Find friends'},{title:'Settings'} ]
});

winLeft.add(leftTableView);

leftTableView.addEventListener("click", function(e){
	Ti.API.info("isAnyViewOpen: " + window.isAnyViewOpen());
	
	closeOpenWindows();
	
	switch(e.index){
		case MENU_HOME:
			break;
		case MENU_PROFILE:
			Ti.include('ui/iphone/profile.js');
			navController.getWindow().add(viewProfile);
			navController.getWindow().setTitle('My Profile');
			break;
			
		case MENU_MAP:
			Ti.include('ui/iphone/map.js');
			navController.getWindow().add(viewMap);
			navController.getWindow().setTitle('Map');
			break;
			
		case MENU_GALLERY:
			Ti.include('ui/iphone/gallery.js');
			navController.getWindow().add(viewGallery);
			navController.getWindow().setTitle('Gallery');
			break;
			
		case MENU_INBOX:
			Ti.include('ui/iphone/inbox.js');
			navController.getWindow().add(viewInbox);
			navController.getWindow().setTitle('Inbox');
			break;
		
		case MENU_PASSPORT:
			Ti.include('ui/iphone/passport.js');
			navController.getWindow().add(viewPassport);
			navController.getWindow().setTitle('Passport');
			break;
		
		case MENU_FIND_FRIENDS:
			Ti.include('ui/iphone/find_friends.js');
			navController.getWindow().add(viewFindFriends);
			navController.getWindow().setTitle('Find friends');
			break;
			
		case MENU_SETTINGS:
			Ti.include('ui/iphone/settings.js');
			navController.getWindow().add(viewSettings);
			navController.getWindow().setTitle('Settings');
			break;
	}
	
	if(window.isAnyViewOpen()){
		window.toggleLeftView();
	}
});

//Right window
var winRight = Ti.UI.createWindow();

var rightTableView = Ti.UI.createTableView({
	font:{fontSize:11},
	rowHeight:40,
	data:[{title:'Home'},{title:'Profile'}, {title:'Map'}, {title:'Gallery'}, {title:'Inbox'}, {title:'Passport'},{title:'Find friends'},{title:'Settings'} ]
});

winRight.add(rightTableView);


function closeOpenWindows(){
	Ti.API.info('closeOpenWindows() closed '+openWindows.length+' windows');
	for(var i=0; i < openWindows.length; i++){
		navController.close(openWindows[i], {animated:false});
	}
}

////////////////////////////////////////////////
// CENTER MAIN WINDOW
var navController = createCenterNavWindow();
////////////////////////////////////////////////

////////////////////////////////////////////////

//Creates and populates the left menu
function createLeftMenu(){
	var leftTableView = Ti.UI.createTableView({
		backgroundColor:'#252931',
		font:UI_FONT_LEFTMENU,
		rowHeight:40,
		data:[{title:'Home'},{title:'Profile'}, {title:'Map'}, {title:'Gallery'}, {title:'Inbox'}, {title:'Passport'},{title:'Find friends'},{title:'Settings'} ]
	});
}

//Creates and populates the right menu
function createRightMenu(){
	
}

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
	
	var rightBtn = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'common/menu_dog.png',
		width:35,
		height:23
	});
	
	rightBtn.addEventListener("click", function(){
		window.toggleRightView();
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
	leftLedge:150,
	rightLedge:150
});

window.setParallaxAmount(0.3);

Ti.include('login.js');
