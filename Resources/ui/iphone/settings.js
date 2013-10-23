
var viewSettings = null;
var settingsMenuTable = null;

var MENU_CHANGE_PASSWORD = 0;
var MENU_EDIT_PROFILE = 1;
var MENU_TAKE_TOUR = 2;
var MENU_REPORT_PROBLEM = 3;
var MENU_LOGOUT = 4;
var MENU_SHARING = 5;

function buildSettingsView(){
	if(viewSettings == null){
		viewSettings = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		settingsMenuTable = Ti.UI.createTableView({
			backgroundColor:UI_BACKGROUND_COLOR,
			sepparatorColor:'d3d2d2',
			top:13,
			width:293
		});
		viewSettings.add(settingsMenuTable);
		settingsMenuTable.addEventListener('click', handleSettingsMenuTableRows);
		
		//inbox table view footer
		settingsMenuTable.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		var settingsMenuData = [];
		settingsMenuData.push(createSettingsMenuRow(MENU_CHANGE_PASSWORD));
		settingsMenuData.push(createSettingsMenuRow(MENU_EDIT_PROFILE));
		settingsMenuData.push(createSettingsMenuRow(MENU_SHARING));
		settingsMenuData.push(createSettingsMenuRow(MENU_TAKE_TOUR));
		settingsMenuData.push(createSettingsMenuRow(MENU_REPORT_PROBLEM));
		settingsMenuData.push(createSettingsMenuRow(MENU_LOGOUT));
		
		settingsMenuTable.setData(settingsMenuData);
	}
}

//Event handler for settings table
function handleSettingsMenuTableRows(e){
	var selectedItem = e.row.menu;
	Ti.API.info('Settings clicked on '+selectedItem);
	
	if(selectedItem == MENU_CHANGE_PASSWORD){
		if(!userObject.facebook_id){
			showChangePasswordView();
		} else {
			alert(getLocalMessage(MSG_NOT_AVAILABLE_WITH_FACEBOOK));
		}
	} else if(selectedItem == MENU_EDIT_PROFILE){
		if(!userObject.facebook_id){
			showEditProfileView();
		} else {
			alert(getLocalMessage(MSG_NOT_AVAILABLE_WITH_FACEBOOK));
		}
	} else if(selectedItem == MENU_TAKE_TOUR){
		
	} else if(selectedItem == MENU_REPORT_PROBLEM){
		showProblemReportEmailDialog();
	} else if(selectedItem == MENU_LOGOUT){
		logout();
	} else if(selectedItem == MENU_SHARING){
		openSettingsSharingView();
	}
}

function openSettingsSharingView(){
	Ti.include('ui/iphone/settings_sharing.js');
	buildSettingsSharingView();
	
	var settingsSharingWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barColor:UI_COLOR,
		translucent:false
	});
	
	//back button
	var settingsSharingBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	settingsSharingWindow.setLeftNavButton(settingsSharingBackButton);
	
	settingsSharingBackButton.addEventListener("click", function() {
	    navController.close(settingsSharingWindow);
	});
	
	settingsSharingWindow.add(viewSettingsSharing);
	openWindows.push(settingsSharingWindow);
	navController.open(settingsSharingWindow);
}

//Disconnects the current user and shows the login screen
function logout(){
	//Clear persisted object
	Ti.App.Properties.removeProperty('user');
	userObject = getUserObject();
	
	//Show login screen
	showLoginPopup();
}

//Opens a new window with the change password form
function showChangePasswordView(){
	Ti.API.info('showChangePasswordView() called ');
	
	Ti.include('ui/iphone/password_edit.js');
	
	var passwordEditWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Change Password'
	});
	
	//back button & event listener
	var passwordEditBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	passwordEditWindow.setLeftNavButton(passwordEditBackButton);
	passwordEditBackButton.addEventListener("click", function() {
	    navController.close(passwordEditWindow);
	});
	
	buildPasswordEditView();
	
	passwordEditWindow.add(passwordEditView);
	
	openWindows.push(passwordEditWindow);
	navController.open(passwordEditWindow);
}

function showEditProfileView(){
	Ti.API.info('showEditProfileView() called ');
	
	Ti.include('ui/iphone/profile_edit.js');
	
	var editProfileView = buildEditProfileView(VIEW_SETTINGS);
	
	var editProfileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Edit profile'
	});
	
	//back button & event listener
	var editProfileBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	editProfileWindow.setLeftNavButton(editProfileBackButton);
	editProfileBackButton.addEventListener("click", function() {
	    navController.close(editProfileWindow);
	});
	
	editProfileWindow.add(editProfileView);
	
	openWindows.push(editProfileWindow);
	navController.open(editProfileWindow);
}

//Opens an email dialog for reporting app problems
function showProblemReportEmailDialog(){
	var recipients = ['report@dogsquare.com'];
	
	var emailDialog = Ti.UI.createEmailDialog();
	emailDialog.setBarColor('black');
	emailDialog.setHtml(true);
	emailDialog.setSubject(REPORT_PROBLEM_SUBJECT);
	emailDialog.setToRecipients(recipients);
	emailDialog.open();
}

function createSettingsMenuRow(menu){
	var row = Ti.UI.createTableViewRow({
		height:47,
		className:'menuRow',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		menu:menu
	});
		
	var icon, label;
	if(menu == MENU_CHANGE_PASSWORD){
		icon = IMAGE_PATH+'settings/profile_edit.png';
		label = 'Change password';
	} else if(menu == MENU_EDIT_PROFILE){
		icon = IMAGE_PATH+'settings/profile_edit.png';
		label = 'Edit Profile';
	} else if(menu == MENU_TAKE_TOUR){
		icon = IMAGE_PATH+'settings/take_the_tour.png';
		label = 'Take the tour';
	}else if(menu == MENU_REPORT_PROBLEM){
		icon = IMAGE_PATH+'settings/report_icon.png';
		label = 'Report a problem';
	} else if(menu == MENU_LOGOUT){
		icon = IMAGE_PATH+'settings/logout.png';
		label = 'Logout';
	} else if(menu == MENU_SHARING){
		icon = IMAGE_PATH+'settings/profile_edit.png';
		label = 'Sharing';
	}
	
	var rowIcon = Titanium.UI.createImageView({
		image:icon,
		left:7
	});
	
	var rowLabel = Titanium.UI.createLabel({
		text:label,
		color:'#716767',
		left:52,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	row.add(rowIcon);
	row.add(rowLabel);
	
	return row;
}
