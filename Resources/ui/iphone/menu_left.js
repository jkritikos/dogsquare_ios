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
	backgroundImage:IMAGE_PATH+'common/cancel_button.png',
	right:9,
	width:54,
	height:31
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

var leftmenuEraseIcon = Titanium.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/erase_icon.png',
	right:5,
	width:16,
	height:18
});
leftmenuSearchContainer.add(leftmenuEraseIcon);
leftmenuEraseIcon.addEventListener('click', handleMenuLeftEraseButton);
leftmenuEraseIcon.hide();

var leftmenuSearchTxtfield = Titanium.UI.createTextField({
	left:35,
	width:179,
	field:'search',
	color:'#bdbcbc',
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
	backgroundColor:UI_MENU_BACKGROUND_COLOR,
	opacity:0.5
});

//activity indicator for search
var leftmenuSearchActivityIndicator = Titanium.UI.createActivityIndicator({
	top:50,
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
    zIndex:2
});
leftmenuSearchBackgroundView.add(leftmenuSearchActivityIndicator);

//table view for search results
var menuLeftSearchResultsTableView = Titanium.UI.createTableView({
	backgroundColor:UI_MENU_BACKGROUND_COLOR,
	separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
	font:UI_FONT_LEFTMENU,
	top:40
});
menuLeftSearchResultsTableView.addEventListener('click', handleLeftSearchResultRows);
menuLeftSearchResultsTableView.addEventListener('scroll', handleMenuLeftSearchResultsScroll);

//remove empty rows
menuLeftSearchResultsTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});
leftmenuSearchBackgroundView.add(menuLeftSearchResultsTableView);

winLeft.add(leftmenuSearchBackgroundView);
leftmenuSearchBackgroundView.hide();

//Remove previous views, navbar elements etc.
function restoreWindowState(){
	window.setPanningMode("FullViewPanning");
	
	//Remove previous view?
	if(CURRENT_VIEW == VIEW_NOTIFICATIONS){
		navController.getWindow().remove(viewNotifications);
	} else if(CURRENT_VIEW == VIEW_MAP){
		navController.getWindow().remove(viewMap);
		navController.getWindow().setTitleControl(null);
	}
}

leftTableView.addEventListener("click", function(e){
	Ti.API.info("isAnyViewOpen: " + window.isAnyViewOpen());
	
	//Hide keyboard from search field
	leftmenuSearchTxtfield.blur();
	//Close open windows
	closeOpenWindows();
	
	//Revert to the standard right window button
	navController.getWindow().rightNavButton = rightBtn;
	
	var menuItem = e.row != null ? e.row.menuItem : e.menuItem;
	
	//Remove previous views, navbar elements etc.
	restoreWindowState();
	
	switch(menuItem){
		case MENU_FEED:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/feeds.js');
			buildFeedsView();
			navController.getWindow().add(viewFeeds);
			navController.getWindow().setTitle('Feed');
			break;
		case MENU_PROFILE:
			CURRENT_VIEW = VIEW_PROFILE;
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/profile.js');
			navController.getWindow().add(viewProfile);
			navController.getWindow().setTitle(userObject.name);
			break;
			
		case MENU_MAP:
			closeOpenWindows();
			CURRENT_VIEW = VIEW_MAP;
			Ti.include('ui/iphone/map.js');
			
			buildMapView(TARGET_MODE_REUSE);
			navController.getWindow().add(viewMap);
			navController.getWindow().setTitle('Map');
			break;
			
		case MENU_GALLERY:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/gallery.js');
			buildGalleryView();
			navController.getWindow().add(viewGallery);
			navController.getWindow().setTitle('Gallery');
			break;
			
		case MENU_INBOX:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/inbox.js');
			navController.getWindow().add(viewInbox);
			navController.getWindow().setTitle('Inbox');
			break;
		
		case MENU_PASSPORT:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/passport.js');
			navController.getWindow().add(viewPassport);
			navController.getWindow().setTitle('Passport');
			break;
		
		case MENU_FIND_FRIENDS:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/find_friends.js');
			navController.getWindow().add(viewFindFriends);
			navController.getWindow().setTitle('Find friends');
			break;
			
		case MENU_SETTINGS:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/settings.js');
			navController.getWindow().add(viewSettings);
			navController.getWindow().setTitle('Settings');
			break;
			
		case MENU_NOTIFICATIONS:
			navController.getWindow().setTitleControl();
			_import('ui/iphone/notifications.js');
			buildNotificationsView();
			navController.getWindow().add(viewNotifications);
			navController.getWindow().setTitle('Notifications');
			break;
		case MENU_BADGES:
			navController.getWindow().setTitleControl();
			Ti.include('ui/iphone/badge_list.js');
			buildBadgeListView();
			navController.getWindow().add(viewBadgeList);
			navController.getWindow().setTitle('Badges');
			break;
	}
	
	if(window.isAnyViewOpen()){
		window.toggleLeftView();
	}
});

//Updates the menu with user specific properties
function updateLeftMenu(obj){
	Ti.API.info('updating left menu for user '+obj.name +' with '+obj.followers+' followers. Thumb path is '+obj.thumb_path);
	
	//photo
	leftTableView.data[0].rows[0].children[0].image = getUserPhoto(obj.thumb_path);
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
		menuProfileImage.defaultImage = IMAGE_PATH+'follow_invite/default_User_photo.png';
		menuProfileImage.image = getUserPhoto(userObject.thumb_path);
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
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
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
		
		var notificationCountBackground = Titanium.UI.createImageView({
			image:IMAGE_PATH+'menu_left/input_numbers_field.png',
			right:82,
			height:28,
			width:30,
			bottom:10
		});
		row.add(notificationCountBackground);
		notificationCountBackground.hide();
		
		var notificationCountLabel = Titanium.UI.createLabel({
			width:'auto',
			height:15,
			bottom:7,
			color:'#ab7b04',
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		notificationCountBackground.add(notificationCountLabel);
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
function populateSearchResultsTableView(uObj, pObj){
	
	Ti.API.info('populate search table');
	var tableRows = [];
	
	var sectionUserHeader = Titanium.UI.createView({
		backgroundColor:'1c2027',
		width:'100%',
		height:20
	});
	
	var sectionPlaceHeader = Titanium.UI.createView({
		backgroundColor:'1c2027',
		width:'100%',
		height:20
	});
	
	var headerSectionUserLabel = Titanium.UI.createLabel({
		text:'Users',
		color:'#ab7b04',
		left:12,
		textAlign:'left'
	});
	sectionUserHeader.add(headerSectionUserLabel);
	
	var headerSectionPlaceLabel = Titanium.UI.createLabel({
		text:'Places',
		color:'#ab7b04',
		left:12,
		textAlign:'left'
	});
	sectionPlaceHeader.add(headerSectionPlaceLabel);
	
	if(uObj.length != 0){
		var userTableViewSection = Titanium.UI.createTableViewSection({
			height:'auto',
			backgroundColor:'transparent'
		});
		userTableViewSection.setHeaderView(sectionUserHeader);
	}
	
	if(pObj.length != 0){
		var placeTableViewSection = Titanium.UI.createTableViewSection({
			height:'auto',
			backgroundColor:'transparent'
		});
		placeTableViewSection.setHeaderView(sectionPlaceHeader);
	}
	
	for(i=0;i<uObj.length;i++){
		Ti.API.info('populate search users table');
		var userRow = Ti.UI.createTableViewRow({
			height:70,
			className:'searchResult',
			backgroundColor:UI_MENU_BACKGROUND_COLOR,
			selectedBackgroundColor:'#1c2027',
			user_id:uObj[i].User.id,
			type:'user'
		});
		
		var userRowThumbImage = Titanium.UI.createImageView({
			image:getUserPhoto(uObj[i].User.thumb),
			defaultImage:IMAGE_PATH+'follow_invite/default_User_photo.png',
			left:4,
			top:4,
			borderRadius:30,
			borderWidth:2,
			borderColor:'454950'
		});
		
		var userRowNameLabel = Titanium.UI.createLabel({
			text:uObj[i].User.name,
			color:'#ab7b04',
			left:77,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		var userRowSeparator = Titanium.UI.createImageView({
			image:IMAGE_PATH+'menu_left/divider.png',
			bottom:-4,
			width:322,
			height:9
		});
		
		userRow.add(userRowSeparator);
		userRow.add(userRowNameLabel);
		userRow.add(userRowThumbImage);
		userTableViewSection.add(userRow);
		
	}
	
	for(i=0;i<pObj.length;i++){
		Ti.API.info('populate search places table');
		var placeRow = Ti.UI.createTableViewRow({
			height:70,
			className:'searchResult',
			backgroundColor:UI_MENU_BACKGROUND_COLOR,
			selectedBackgroundColor:'#1c2027',
			place_id:pObj[i].Place.id,
			type:'place'
		});
		
		var placeRowNameLabel = Titanium.UI.createLabel({
			text:pObj[i].Place.name,
			color:'#ab7b04',
			left:52,
			font:{fontSize:18, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		var placeRowSeparator = Titanium.UI.createImageView({
			image:IMAGE_PATH+'menu_left/divider.png',
			bottom:-4,
			width:322,
			height:9
		});
		
		placeRow.add(placeRowSeparator);
		placeRow.add(placeRowNameLabel);
		placeTableViewSection.add(placeRow);
	}
	
	if(uObj.length != 0){
		tableRows.push(userTableViewSection);
	}
	
	if(pObj.length != 0){
		tableRows.push(placeTableViewSection);
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
			leftmenuEraseIcon.show();
			leftmenuSearchBackgroundView.opacity = 1;
			getLeftMenuOnlineUser(name);
		}else{
			leftmenuEraseIcon.hide();
			//if textfield empty, reset search view
			leftmenuSearchActivityIndicator.hide();
			leftmenuSearchBackgroundView.opacity = 0.5;
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
	leftmenuSearchTxtfield.blur();
	window.leftLedge = 65;
	window.setParallaxAmount(0.3);
}
	
//handle textfield when not focused
function handleLeftMenuTextFieldBlur(e){
	var field = e.source.field;
	
	leftmenuSearchActivityIndicator.hide();
	if(field == 'search'){
		
		if(leftmenuSearchTxtfield.value == ''){
			leftmenuSearchTxtfieldLabel.show();
		}
	}
}

//get online users
function getLeftMenuOnlineUser(n){
	Ti.API.info('getLeftMenuOnlineUser() called for user='+ n);
	leftmenuSearchActivityIndicator.show();
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
	
	};
	
	xhr.onload = function(e) {
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			leftmenuSearchActivityIndicator.hide();
			
			populateSearchResultsTableView(jsonData.data.users, jsonData.data.places);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		}else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('GET',API+'search');
	xhr.send({
		user_id:userObject.userId,
		name:n
	});
}

//handle user rows from search 
function handleLeftSearchResultRows(e){
	leftmenuSearchTxtfield.blur();
	setTimeout(function(){clearSearchBackground();},400);
	closeOpenWindows();
	restoreWindowState();
	
	var userId = e.row.user_id;
	var placeId = e.row.place_id;
	var type = e.row.type;
	//show profile view if the user, is the device owner, else show profile other view
	if (userId == userObject.userId){
		Ti.include('ui/iphone/profile.js');
		navController.getWindow().add(viewProfile);
		navController.getWindow().setTitle(userObject.name);
	}else if (type == 'user'){
		Ti.include('ui/iphone/profile_other.js');
		var nameUser = e.row.children[1].text;
		var profileOtherView = buildProfileOtherView(userId, nameUser);
		
		navController.getWindow().add(profileOtherView);
		navController.getWindow().setTitle(nameUser);
	}else if (type == 'place'){
		Ti.include('ui/iphone/place_view.js');
		
		var checkinPlaceView = buildCheckinPlaceView(CHECKIN_PLACE_VIEW, placeId);
		var namePlace = e.row.children[1].text;
		
		navController.getWindow().add(checkinPlaceView);
		navController.getWindow().setTitle(namePlace);
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
}


function updateLeftMenuCounts(cFollowers, cInbox, cNotifications){
	Ti.API.info('updateLeftMenuCounts() called with '+cFollowers,' followers '+cInbox+' inbox '+cNotifications+' notifications');
	
	var notifBackground = leftTableView.data[0].rows[5].children[0];
	var notifLabel = leftTableView.data[0].rows[5].children[0].children[0];
	var followersLabel = leftTableView.data[0].rows[0].children[1];
	
	followersLabel.text = cFollowers +' followers';
	if(cNotifications != 0){
		notifLabel.text = cNotifications;
		//need to put a setTimeout because it searches the label width while it is not yet created
		var t = setTimeout(function(){
			notifBackground.width = notifLabel.toImage().width + 20;
			notifBackground.show();
		}, 100);
	}else{
		notifBackground.hide();
	}
}

function handleMenuLeftSearchResultsScroll(){
	leftmenuSearchTxtfield.blur();
}

function handleMenuLeftEraseButton(){
	leftmenuSearchTxtfield.value = '';
	leftmenuEraseIcon.hide();
	
	leftmenuSearchBackgroundView.opacity = 0.5;
	menuLeftSearchResultsTableView.data = [];
}
