var listUsersTableView = null;

function buildListUsersView(){
	var listUsersView = Ti.UI.createView({
		backgroundColor:'eeeded'
	});
	
	listUsersTableView = Titanium.UI.createTableView({
		minRowHeight:60,
		width:290,
		backgroundColor:'transparent',
		top:45,
		bottom:0
	});
	listUsersView.add(listUsersTableView);
	listUsersTableView.addEventListener('click', handleListUsersTableViewRows);
	
	//remove empty rows
	listUsersTableView.footerView = Ti.UI.createView({
	    height: 1,
	    backgroundColor: 'transparent'
	});
	
	return listUsersView;
}

function populateListUsersTableView(uData){
	var tableRows = [];
	
	for(i=0;i<uData.users.length;i++){	
		var userRow = Ti.UI.createTableViewRow({
			className:'usersRow',
			height:73,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			userId:uData.users[i].User.id
		});
		
		var rowUserImage = Titanium.UI.createImageView({
			image:REMOTE_USER_IMAGES + uData.users[i].User.thumb,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		
		
		var rowUserNameLabel = Titanium.UI.createLabel({
			text:uData.users[i].User.name,
			color:'black',
			height:22,
			textAlign:'center',
			opacity:0.6,
			left:72,
			font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'}
		});
		
		userRow.add(rowUserImage);
		userRow.add(rowUserNameLabel);
		tableRows.push(userRow);
	}
	listUsersTableView.setData(tableRows);
	Ti.API.info('followers table View has been populated');
}

function handleListUsersTableViewRows(e){
	
	var userId = e.row.userId;
	
	var profileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR
	});
	
	//back button & event listener
	var profileBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	profileWindow.setLeftNavButton(profileBackButton);
	profileBackButton.addEventListener("click", function() {
	    navController.close(profileWindow);
	});
	
	//show profile view if the user, is the device owner, else show profile other view
	if (userId == userObject.userId){
		Ti.include('ui/iphone/profile.js');
		profileWindow.add(viewProfile);
		profileWindow.setTitle(userObject.name);
		
		openWindows.push(profileWindow);
		navController.open(profileWindow);
	}else {
		Ti.include('ui/iphone/profile_other.js');
		
		var profileOtherView = buildProfileOtherView(userId);
		var nameUser = e.row.children[1].text;
		
		profileWindow.add(profileOtherView);
		profileWindow.setTitle(nameUser);
		
		openWindows.push(profileWindow);
		navController.open(profileWindow);
	}
}