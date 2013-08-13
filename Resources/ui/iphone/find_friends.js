var viewFindFriends = Ti.UI.createView({
	backgroundColor:'eeeded'
});

var friendsArray = ['Antony Lar.', 'Allis M.', 'AceSwift'];

var findFriendsTabsArea = Ti.UI.createImageView({
	image:IMAGE_PATH+'follow_invite/Tabs_Area.png',
	top:-3
});

viewFindFriends.add(findFriendsTabsArea);

var findFriendsTabContactsLabel = Titanium.UI.createLabel({
	text:'Contacts',
	color:'black',
	height:47,
	textAlign:'center',
	opacity:0.6,
	font:{fontSize:18, fontWeight:'semibold', fontFamily:'Open Sans'}
});
findFriendsTabsArea.add(findFriendsTabContactsLabel);

var findFriendsSearchContainer = Titanium.UI.createView({
	backgroundColor:'white',
	top:50,
	width:234,
	height:30,
	borderWidth:1,
	borderColor:'white'
});

var findFriendsSearchIcon = Titanium.UI.createImageView({
	image:IMAGE_PATH+'menu_left/search_icon.png',
	left:5
});

var findFriendsSearchTxtfield = Titanium.UI.createTextField({
	left:35,
	width:200,
	field:'search'
});

findFriendsSearchContainer.add(findFriendsSearchTxtfield);
findFriendsSearchTxtfield.addEventListener('change', handlefindFriendsTextFieldFocus);
findFriendsSearchTxtfield.addEventListener('blur', handlefindFriendsTextFieldBlur);

var findFriendsSearchTxtfieldLabel = Titanium.UI.createLabel({
	text:'Search',
	color:'CCCCCC',
	height:22,
	textAlign:'center',
	opacity:0.6,
	left:3,
	font:{fontSize:16, fontWeight:'semibold', fontFamily:'Open Sans'}
});
findFriendsSearchTxtfield.add(findFriendsSearchTxtfieldLabel);
findFriendsSearchContainer.add(findFriendsSearchIcon);
viewFindFriends.add(findFriendsSearchContainer);

var findFriendsTableView = Titanium.UI.createTableView({
	minRowHeight:60,
	width:290,
	data:populateFindFriendsTableView(),
	backgroundColor:'transparent',
	top:133,
	bottom:0,
	allowsSelection:false
});

viewFindFriends.add(findFriendsTableView);

function populateFindFriendsTableView(){
	var tableRows = [];
	
	for(i=0;i<=2;i++){	
		var row = Ti.UI.createTableViewRow({
			className:'findFriendsRow',
			height:73,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent'
		});
		
		var friendImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
		var rowFriendImage = Titanium.UI.createImageView({
			image:friendImageFile.nativePath,
			left:3,
			width:60,
			height:60,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		row.add(rowFriendImage);
		
		var rowLabel = Titanium.UI.createLabel({
			text:friendsArray[i],
			color:'black',
			height:22,
			textAlign:'center',
			opacity:0.6,
			left:72,
			font:{fontSize:17, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		row.add(rowLabel);
		
		if(i == 2){
			var rowInviteButton = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'follow_invite/Follow_btn.png',
				right:9,
				width:86,
				height:29
			});
			row.add(rowInviteButton);
		}else{
			var rowInviteButton = Titanium.UI.createButton({
				backgroundImage:IMAGE_PATH+'follow_invite/invite_btn.png',
				right:9,
				width:86,
				height:29
			});
			row.add(rowInviteButton);
		}
		
		tableRows.push(row);
	}
	return tableRows;
}

function handlefindFriendsTextFieldFocus(e){
		var field = e.source.field;
		
		if(field == 'search'){
			if(findFriendsSearchTxtfield.value != ''){
				findFriendsSearchTxtfieldLabel.hide();
			}else{
				findFriendsSearchTxtfieldLabel.show();
			}
		}
	}
	
//handle textfield when not focused
function handlefindFriendsTextFieldBlur(e){
	var field = e.source.field;
	
	if(field == 'search'){
		if(findFriendsSearchTxtfield.value == ''){
			findFriendsSearchTxtfieldLabel.show();
		}
		findFriendsSearchTxtfieldLabel.blur();
	}
}