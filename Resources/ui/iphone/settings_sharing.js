var viewSettingsSharing = null;
var settingsSharingMenuTable = null;

var MENU_FACEBOOK_ACTIVITIES = 0;
var MENU_FACEBOOK_CHECKINS = 1;

function buildSettingsSharingView(){
	if(viewSettingsSharing == null){
		viewSettingsSharing = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		settingsSharingMenuTable = Ti.UI.createTableView({
			backgroundColor:UI_BACKGROUND_COLOR,
			sepparatorColor:'d3d2d2',
			top:13,
			width:293
		});
		
		viewSettingsSharing.add(settingsSharingMenuTable);
		
		//inbox table view footer
		settingsSharingMenuTable.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		var sharingMenuData = [];
		sharingMenuData.push(createSharingMenuRow(MENU_FACEBOOK_CHECKINS));
		sharingMenuData.push(createSharingMenuRow(MENU_FACEBOOK_ACTIVITIES));
		
		settingsSharingMenuTable.setData(sharingMenuData);
	}
}

//Event handler for checkin switch clicks
function handleFBCheckinSharingSelection(e){
	Ti.API.info('Switch value: ' + e.value+' for option CHECKIN');
	Ti.App.Properties.setBool(SHARING_CHECKIN_FACEBOOK, e.value);
	
	//Login to FB if needed
	if(e.value && !fb.loggedIn){
		fb.authorize();
	}
	
	/*
	if(!fb.loggedIn){
		alert('DEN EXEIS KANEI LOGIN STO FB');
	} 
	
	//Request write permissions if needed
	if(!hasFBWritePermissions()){
		fb.reauthorize(FB_WRITE_PERMISSIONS, 'friends', function(){
			Ti.API.info('FACEBOOK got write permissions from sharing settings');
		});
	}
	*/
}

//Event handler for checkin switch clicks
function handleFBCActivitySharingSelection(e){
	Ti.API.info('Switch value: ' + e.value+' for option ACTIVITY');
	Ti.App.Properties.setBool(SHARING_ACTIVITY_FACEBOOK, e.value);
	
	//Login to FB if needed
	if(e.value && !fb.loggedIn){
		fb.authorize();
	}
	
	/*
	if(!fb.loggedIn){
		alert('DEN EXEIS KANEI LOGIN STO FB');
	} 
	
	//Request write permissions if needed
	if(!hasFBWritePermissions()){
		fb.reauthorize(FB_WRITE_PERMISSIONS, 'friends', function(){
			Ti.API.info('FACEBOOK got write permissions from sharing settings');
		});
	}*/
}

function createSharingMenuRow(menu){
	var row = Ti.UI.createTableViewRow({
		height:47,
		className:'menuRow',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		menu:menu
	});
	
	var switchValue = false;
		
	var icon, label;
	if(menu == MENU_FACEBOOK_CHECKINS){
		label = 'My checkins on Facebook';
		switchValue = Ti.App.Properties.getBool(SHARING_CHECKIN_FACEBOOK);
	} else if(menu == MENU_FACEBOOK_ACTIVITIES){
		label = 'My activities on Facebook';
		switchValue = Ti.App.Properties.getBool(SHARING_ACTIVITY_FACEBOOK);
	}
	
	var rowLabel = Titanium.UI.createLabel({
		text:label,
		color:'#716767',
		left:10,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	var rowSwitch = Ti.UI.createSwitch({
		value:switchValue != null ? switchValue : false, // mandatory property for iOS
		right:10
	});
	
	if(menu == MENU_FACEBOOK_CHECKINS){
		rowSwitch.addEventListener('change', handleFBCheckinSharingSelection);
	} else if(menu == MENU_FACEBOOK_ACTIVITIES){
		rowSwitch.addEventListener('change', handleFBCActivitySharingSelection);
	}
	
	row.add(rowLabel);
	row.add(rowSwitch);
	
	return row;
}