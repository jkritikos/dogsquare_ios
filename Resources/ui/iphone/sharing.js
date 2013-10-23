var viewSharing = null;
var sharingMenuTable = null;

var MENU_FACEBOOK_ACTIVITIES = 0;
var MENU_FACEBOOK_CHECKINS = 1;

function buildSharingView(){
	if(viewSharing == null){
		viewSharing = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		sharingMenuTable = Ti.UI.createTableView({
			backgroundColor:UI_BACKGROUND_COLOR,
			sepparatorColor:'d3d2d2',
			top:13,
			width:293
		});
		viewSharing.add(sharingMenuTable);
		
		//inbox table view footer
		sharingMenuTable.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
		
		var sharingMenuData = [];
		sharingMenuData.push(createSharingMenuRow(MENU_FACEBOOK_ACTIVITIES));
		sharingMenuData.push(createSharingMenuRow(MENU_FACEBOOK_CHECKINS));
		
		sharingMenuTable.setData(sharingMenuData);
	}
}

function createSharingMenuRow(menu){
	var row = Ti.UI.createTableViewRow({
		height:47,
		className:'menuRow',
		backgroundColor:'white',
		selectedBackgroundColor:'transparent',
		menu:menu
	});
		
	var icon, label;
	if(menu == MENU_CHANGE_PASSWORD){
		label = 'My checkins on Facebook';
	} else if(menu == MENU_EDIT_PROFILE){
		label = 'My activities on Facebook';
	}
	
	var rowLabel = Titanium.UI.createLabel({
		text:label,
		color:'#716767',
		left:10,
		font:{fontSize:16, fontWeight:'regular', fontFamily:'Open Sans'}
	});
	
	var rowSwitch = Ti.UI.createSwitch({
	  value:true, // mandatory property for iOS
	  right:10 
	});
	
	row.add(rowLabel);
	row.add(rowSwitch);
	
	return row;
}