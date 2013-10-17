
var viewSettings = null;
var settingsMenuTable = null;

var MENU_EDIT_PROFILE = 1;
var MENU_TAKE_TOUR = 2;
var MENU_REPORT_PROBLEM = 3;
var MENU_LOGOUT = 4;

function buildSettingsView(){
	if(viewSettings == null){
		viewSettings = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		var settingsMenuTable = Ti.UI.createTableView({
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
		settingsMenuData.push(createSettingsMenuRow(MENU_EDIT_PROFILE));
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
	
	if(selectedItem == MENU_EDIT_PROFILE){
		showEditProfileView();
	} else if(selectedItem == MENU_TAKE_TOUR){
		
	} else if(selectedItem == MENU_REPORT_PROBLEM){
		showProblemReportEmailDialog();
	} else if(selectedItem == MENU_LOGOUT){
		
	}
}

function showEditProfileView(){
	Ti.API.info('showEditProfileView() called ');
	
	Ti.include('ui/iphone/profile_edit.js');
	
	var editProfileView = buildEditProfileView();
	
	var editProfileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR
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
	if(menu == MENU_EDIT_PROFILE){
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
