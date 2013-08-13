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

//Search view
var leftmenuSearchView = Ti.UI.createView({
	backgroundColor:UI_MENU_BACKGROUND_COLOR,
	height:40,
	top:0
});

var leftmenuSearchContainer = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_field.png',
	left:1
});

var leftmenuSearchIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_icon.png',
	left:5
});

var leftmenuSearchTxtfield = Titanium.UI.createTextField({
	left:35,
	width:200,
	field:'search'
});

leftmenuSearchContainer.add(leftmenuSearchTxtfield);
leftmenuSearchTxtfield.addEventListener('change', handleLeftMenuTextFieldFocus);
leftmenuSearchTxtfield.addEventListener('blur', handleLeftMenuTextFieldBlur);

var leftmenuSearchTxtfieldLabel = Titanium.UI.createLabel({
	text:'Search',
	color:'white',
	textAlign:'center',
	opacity:0.3,
	left:3,
	font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
});
leftmenuSearchTxtfield.add(leftmenuSearchTxtfieldLabel);

leftmenuSearchContainer.add(leftmenuSearchIcon);
leftmenuSearchView.add(leftmenuSearchContainer);

winLeft.add(leftmenuSearchView);

//Left window menu
var leftTableView = createLeftMenu();

winLeft.add(leftTableView);

leftTableView.addEventListener("click", function(e){
	Ti.API.info("isAnyViewOpen: " + window.isAnyViewOpen());
	
	closeOpenWindows();
	
	var menuItem = e.row != null ? e.row.menuItem : e.menuItem;
	
	switch(menuItem){
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

//Creates and populates the left menu
function createLeftMenu(){
	var leftTableView = Ti.UI.createTableView({
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		font:UI_FONT_LEFTMENU,
		top:40
	});
	
	var leftMenuData = [];
	
	//Create profile row first
	var topRow = Ti.UI.createTableViewRow({
		height:82,
		className:'LEFT_MENU',
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		selectedBackgroundColor:'#1c2027',
		menuItem:MENU_PROFILE
	});
	
	//Profile image
	var profileImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
	var menuProfileImage = Titanium.UI.createImageView({
		image:profileImageFile.nativePath,
		left:11,
		top:11,
		width:60,
		height:60,
		borderRadius:30,
		borderWidth:2,
		borderColor:'#f9bf30'
	});
	
	var usernameLabel = Titanium.UI.createLabel({
		text:'Jein Mc Lane',
		color:'#ab7b04',
		left:82,
		top:17,
		font:{fontSize:19, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	var followersLabel = Titanium.UI.createLabel({
		text:'23 followers',
		color:'#b6b5b6',
		left:82,
		top:42,
		font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	var rowSeparator = Titanium.UI.createImageView({
		image:IMAGE_PATH+'menu_left/divider.png',
		bottom:-4,
		width:322
	});
	
	topRow.add(menuProfileImage);
	topRow.add(followersLabel);
	topRow.add(usernameLabel);
	topRow.add(rowSeparator);
	
	leftMenuData.push(topRow);
	leftMenuData.push(createLeftMenuRow(MENU_HOME));
	leftMenuData.push(createLeftMenuRow(MENU_MAP));
	leftMenuData.push(createLeftMenuRow(MENU_GALLERY));
	leftMenuData.push(createLeftMenuRow(MENU_INBOX));
	leftMenuData.push(createLeftMenuRow(MENU_PASSPORT));
	leftMenuData.push(createLeftMenuRow(MENU_FIND_FRIENDS));
	leftMenuData.push(createLeftMenuRow(MENU_SETTINGS));
	
	leftTableView.setData(leftMenuData);
	
	return leftTableView;
}

//Creates a single row for the left menu table
function createLeftMenuRow(menuItem){
	var row = Ti.UI.createTableViewRow({
		height:49,
		className:'LEFT_MENU',
		backgroundColor:UI_MENU_BACKGROUND_COLOR,
		selectedBackgroundColor:'#1c2027',
		menuItem:menuItem
	});
		
	var icon, label;
	if(menuItem == MENU_HOME){
		icon = IMAGE_PATH+'menu_left/Home_icon.png';
		label = 'Home';
	} else if(menuItem == MENU_PROFILE){
		icon = IMAGE_PATH+'menu_left/Home_icon.png';
		label = 'Profile';
	} else if(menuItem == MENU_MAP){
		icon = IMAGE_PATH+'menu_left/Map_icon.png';
		label = 'Map';
	} else if(menuItem == MENU_GALLERY){
		icon = IMAGE_PATH+'menu_left/Gallery_icon.png';
		label = 'Gallery';
	} else if(menuItem == MENU_INBOX){
		icon = IMAGE_PATH+'menu_left/Inbox_icon.png';
		label = 'Inbox';
	} else if(menuItem == MENU_PASSPORT){
		icon = IMAGE_PATH+'menu_left/Passport_icon.png';
		label = 'Passport';
	} else if(menuItem == MENU_FIND_FRIENDS){
		icon = IMAGE_PATH+'menu_left/Friends_icon.png';
		label = 'Find friends';
	} else if(menuItem == MENU_SETTINGS){
		icon = IMAGE_PATH+'menu_left/Settings_icon.png';
		label = 'Settings';
	}
	
	var rowIcon = Titanium.UI.createImageView({
		image:icon,
		left:7
	});
	
	var rowSeparator = Titanium.UI.createImageView({
		image:IMAGE_PATH+'menu_left/divider.png',
		bottom:-4,
		width:322,
		height:9
	});
	
	var rowLabel = Titanium.UI.createLabel({
		text:label,
		color:'#ab7b04',
		left:52,
		font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	row.add(rowSeparator);
	row.add(rowIcon);
	row.add(rowLabel);
	
	return row;
}

function handleLeftMenuTextFieldFocus(e){
		var field = e.source.field;
		
		if(field == 'search'){
			if(leftmenuSearchTxtfield.value != ''){
				leftmenuSearchTxtfieldLabel.hide();
			}else{
				leftmenuSearchTxtfieldLabel.show();
			}
		}
	}
	
//handle textfield when not focused
function handleLeftMenuTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 'search'){
		if(leftmenuSearchTxtfield.value == ''){
			leftmenuSearchTxtfieldLabel.show();
		}
	}
}