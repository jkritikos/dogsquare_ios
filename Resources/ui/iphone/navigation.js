//Menu constants
var MENU_HOME = 0;
var MENU_PROFILE = 1;
var MENU_MAP = 2;
var MENU_GALLERY = 3;
var MENU_INBOX = 4;
var MENU_PASSPORT = 5;
var MENU_FIND_FRIENDS = 6;
var MENU_SETTINGS = 7;

var winLeft = Ti.UI.createWindow();

var leftTableView = Ti.UI.createTableView({
	font:{fontSize:11},
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
			window.toggleLeftView();
			break;
			
		case MENU_MAP:
			Ti.include('ui/iphone/map.js');
			navController.getWindow().add(viewMap);
			navController.getWindow().setTitle('Map');
			window.toggleLeftView();
			break;
			
		case MENU_GALLERY:
			Ti.include('ui/iphone/gallery.js');
			navController.getWindow().add(viewGallery);
			navController.getWindow().setTitle('Gallery');
			window.toggleLeftView();
			break;
			
		case MENU_INBOX:
			Ti.include('ui/iphone/inbox.js');
			navController.getWindow().add(viewInbox);
			navController.getWindow().setTitle('Inbox');
			window.toggleLeftView();
			break;
		
		case MENU_PASSPORT:
			Ti.include('ui/iphone/passport.js');
			navController.getWindow().add(viewPassport);
			navController.getWindow().setTitle('Passport');
			window.toggleLeftView();
			break;
		
		case MENU_FIND_FRIENDS:
			Ti.include('ui/iphone/find_friends.js');
			navController.getWindow().add(viewFindFriends);
			navController.getWindow().setTitle('Find friends');
			window.toggleLeftView();
			break;
			
		case MENU_SETTINGS:
			Ti.include('ui/iphone/settings.js');
			navController.getWindow().add(viewSettings);
			navController.getWindow().setTitle('Settings');
			window.toggleLeftView();
			break;
	}
});

function closeOpenWindows(){
	for(var i=0; i < openWindows.length; i++){
		navController.close(openWindows[i], {animated:false});
	}
}
