
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
		//settingsMenuTable.addEventListener('click', handleSettingsMenuTableRows);
		
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
