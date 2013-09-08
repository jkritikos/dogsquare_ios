//Menu constants
var MENU_FEED = 0;
var MENU_PROFILE = 1;
var MENU_MAP = 2;
var MENU_GALLERY = 3;
var MENU_INBOX = 4;
var MENU_PASSPORT = 5;
var MENU_FIND_FRIENDS = 6;
var MENU_SETTINGS = 7;
var MENU_BADGES = 8;
var MENU_NOTIFICATIONS = 9;

//Left window
var winLeft = Ti.UI.createWindow();

//Search view
var leftmenuSearchView = Ti.UI.createView({
	backgroundColor:UI_MENU_BACKGROUND_COLOR,
	height:40,
	top:0,
	zIndex:5
});

//close button for search - default hidden
var menuLeftCloseSearchViewButton = Titanium.UI.createButton({
	title:'close',
	right:9,
	width:50,
	height:29
});
leftmenuSearchView.add(menuLeftCloseSearchViewButton);
menuLeftCloseSearchViewButton.addEventListener('click', handleLeftCloseSearchButton);
menuLeftCloseSearchViewButton.hide();

var leftmenuSearchContainer = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_field.png',
	left:0
});

var leftmenuSearchIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_icon.png',
	left:5
});

var leftmenuSearchTxtfield = Titanium.UI.createTextField({
	left:35,
	width:200,
	field:'search',
	returnKeyType: Ti.UI.RETURNKEY_SEARCH
});

leftmenuSearchContainer.add(leftmenuSearchTxtfield);
leftmenuSearchTxtfield.addEventListener('change', handleLeftMenuTextFieldChange);
leftmenuSearchTxtfield.addEventListener('focus', handleLeftMenuTextFieldFocus);
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

//background for search results
var leftmenuSearchBackgroundView = Ti.UI.createView({
	backgroundColor:'black',
	opacity:0.5
});

winLeft.add(leftmenuSearchBackgroundView);
leftmenuSearchBackgroundView.hide();

//activity indicator for search
var leftmenuSearchActivityIndicator = Titanium.UI.createActivityIndicator({
	top:50,
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
});
winLeft.add(leftmenuSearchActivityIndicator);

//table view for search results
var menuLeftSearchResultsTableView = Titanium.UI.createTableView({
	backgroundColor:UI_MENU_BACKGROUND_COLOR,
	font:UI_FONT_LEFTMENU,
	top:40
});
menuLeftSearchResultsTableView.addEventListener('click', handleLeftSearchResultRows);

//remove empty rows
menuLeftSearchResultsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});
leftmenuSearchBackgroundView.add(menuLeftSearchResultsTableView);

leftTableView.addEventListener("click", function(e){
	Ti.API.info("isAnyViewOpen: " + window.isAnyViewOpen());
	
	//Hide keyboard from search field
	leftmenuSearchTxtfield.blur();
	//Close open windows
	closeOpenWindows();
	
	//Revert to the standard right window button
	navController.getWindow().rightNavButton = rightBtn;
	
	var menuItem = e.row != null ? e.row.menuItem : e.menuItem;
	
	switch(menuItem){
		case MENU_FEED:
			Ti.include('ui/iphone/profile_other.js');
			var profileOtherView = buildProfileOtherView(20);
			navController.getWindow().add(profileOtherView);
			navController.getWindow().setTitle('John D.');
			break;
		case MENU_PROFILE:
			Ti.include('ui/iphone/profile.js');
			navController.getWindow().add(viewProfile);
			navController.getWindow().setTitle(userObject.name);
			break;
			
		case MENU_MAP:
			closeOpenWindows();
			Ti.include('ui/iphone/map.js');
			navController.getWindow().add(viewMap);
			navController.getWindow().setTitle('Map');
			
			//search field
			/*
			var mapSearchContainer = Titanium.UI.createView({
				backgroundColor:'white',
				width:100
			});
			
			var mapSearchTxtfield = Titanium.UI.createTextField({
				left:5,
				width:100,
				field:'search'
			});
			
			mapSearchContainer.add(mapSearchTxtfield);
			
			navController.getWindow().setTitleControl(mapSearchContainer);
			*/
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
			
			//Change right nav button
			var newMessageRightNavButton = Ti.UI.createButton({ 
				backgroundImage:IMAGE_PATH+'checkin_place/add_icon.png',
				width:12,
				height:12
			});
			
			navController.getWindow().rightNavButton = newMessageRightNavButton;
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
			
		case MENU_NOTIFICATIONS:
			_import('ui/iphone/notifications.js');
			buildNotificationsView();
			navController.getWindow().add(viewNotifications);
			navController.getWindow().setTitle('Notifications');
			break;
	}
	
	if(window.isAnyViewOpen()){
		window.toggleLeftView();
	}
});

//Updates the menu with user specific properties
function updateLeftMenu(obj){
	Ti.API.info('updating left menu for user '+obj.name +' with '+obj.followers+' followers. Thumb path is '+obj.thumb_path);
	
	var profileImageFile = Titanium.Filesystem.getFile(obj.thumb_path);
	var menuImageBlobCropped = profileImageFile.toBlob();
	
	//photo
	leftTableView.data[0].rows[0].children[0].image = menuImageBlobCropped;
	//name
	leftTableView.data[0].rows[0].children[2].text = obj.name;
	//followers
	leftTableView.data[0].rows[0].children[1].text = obj.followers +' followers';
}

//Creates and populates the left menu
function createLeftMenu(){
	Ti.API.info('createLeftMenu with userObject '+JSON.stringify(userObject));
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
	var menuProfileImage = Titanium.UI.createImageView({
		left:11,
		top:11,
		borderRadius:30,
		borderWidth:2,
		borderColor:'#f9bf30'
	});
	
	topRow.add(menuProfileImage);
	
	//Load the rounded thumbnail image
	if(userObject.thumb_path){
		var profileImageFile = Titanium.Filesystem.getFile(userObject.thumb_path);
		menuProfileImage.image = profileImageFile.toBlob();
	}
	
	var usernameLabel = Titanium.UI.createLabel({
		text:userObject.name,
		color:'#ab7b04',
		left:82,
		top:17,
		font:{fontSize:19, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	var followersLabel = Titanium.UI.createLabel({
		text:userObject.followers + ' followers',
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
	
	topRow.add(followersLabel);
	topRow.add(usernameLabel);
	topRow.add(rowSeparator);
	
	leftMenuData.push(topRow);
	leftMenuData.push(createLeftMenuRow(MENU_FEED));
	leftMenuData.push(createLeftMenuRow(MENU_MAP));
	leftMenuData.push(createLeftMenuRow(MENU_GALLERY));
	leftMenuData.push(createLeftMenuRow(MENU_INBOX));
	leftMenuData.push(createLeftMenuRow(MENU_NOTIFICATIONS));
	leftMenuData.push(createLeftMenuRow(MENU_BADGES));
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
	if(menuItem == MENU_FEED){
		icon = IMAGE_PATH+'menu_left/newsFeed_menu.png';
		label = 'Feed';
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
	} else if(menuItem == MENU_BADGES){
		icon = IMAGE_PATH+'menu_left/badges_menu.png';
		label = 'Badges';
	} else if(menuItem == MENU_NOTIFICATIONS){
		icon = IMAGE_PATH+'menu_left/notifications_menu.png';
		label = 'Notifications';
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

//populate search result rows - primarily for users only
function populateSearchResultsTableView(uObj){
	
	var tableRows = [];
	
	for(i=0;i<uObj.length;i++){
		
		var row = Ti.UI.createTableViewRow({
			height:49,
			className:'searchResult',
			backgroundColor:UI_MENU_BACKGROUND_COLOR,
			selectedBackgroundColor:'#1c2027',
			user_id:uObj[i].User.id
		});
		
		var rowNameLabel = Titanium.UI.createLabel({
			text:uObj[i].User.name,
			color:'#ab7b04',
			left:52,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		row.add(rowNameLabel);
		tableRows.push(row);
	}
	
	menuLeftSearchResultsTableView.setData(tableRows);
}

//handle text field change
function handleLeftMenuTextFieldChange(e){
	var field = e.source.field;
	var name = e.source.value;	
	
	if(field == 'search'){
		//on textfield change, change the opacity and get users found
		if(name != ''){
			leftmenuSearchBackgroundView.opacity = 1;
			getLeftMenuOnlineUser(name);
		}else{
			//if textfield empty, reset search view
			leftmenuSearchBackgroundView.opacity = 0.5;
			leftmenuSearchBackgroundView.backgroundColor = 'black';
			menuLeftSearchResultsTableView.data = [];
		}
		
		if(leftmenuSearchTxtfield.value != ''){
			leftmenuSearchTxtfieldLabel.hide();
		}else{
			leftmenuSearchTxtfieldLabel.show();
		}
	}
}

//handle textfield focus
function handleLeftMenuTextFieldFocus(e){
	if(menuLeftSearchResultsTableView.data == []){
		
	}
	leftmenuSearchBackgroundView.show();
	window.leftLedge = 0;
	window.setParallaxAmount(0.0);
	menuLeftCloseSearchViewButton.show();
}

//handle close button for search
function handleLeftCloseSearchButton(){
	clearSearchBackground();
	window.leftLedge = 65;
	window.setParallaxAmount(0.3);
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

//get online users
function getLeftMenuOnlineUser(n){
	Ti.API.info('getLeftMenuOnlineUser() called for user='+ n);
	leftmenuSearchBackgroundView.backgroundColor = UI_MENU_BACKGROUND_COLOR;
	leftmenuSearchActivityIndicator.show();
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			leftmenuSearchActivityIndicator.hide();
			populateSearchResultsTableView(jsonData.data.users);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('GET',API+'searchUser');
	xhr.send({
		name:n
	});
}

//handle user rows from search 
function handleLeftSearchResultRows(e){
	clearSearchBackground();
	
	closeOpenWindows();
	
	var userId = e.row.user_id;
	//show profile view if the user, is the device owner, else show profile other view
	if (userId == userObject.userId){
		Ti.include('ui/iphone/profile.js');
		navController.getWindow().add(viewProfile);
		navController.getWindow().setTitle(userObject.name);
	}else{
		Ti.include('ui/iphone/profile_other.js');
		
		var profileOtherView = buildProfileOtherView(userId);
		var nameUser = e.row.children[0].text;
		
		navController.getWindow().add(profileOtherView);
		navController.getWindow().setTitle(nameUser);
	}
	if(window.isAnyViewOpen()){
		window.toggleLeftView();
	}
	
	window.leftLedge = 65;
	window.setParallaxAmount(0.3);
}

//change properties and data back to default
function clearSearchBackground(){
	leftmenuSearchActivityIndicator.hide();
	leftmenuSearchBackgroundView.hide();
	menuLeftCloseSearchViewButton.hide();
	leftmenuSearchTxtfield.blur();
}
