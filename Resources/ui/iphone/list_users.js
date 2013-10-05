var listUsersTableView = null;

var ROW_TYPE_USER = 1;
var ROW_TYPE_DOG = 2;

function buildListUsersView(){
	var listUsersView = Ti.UI.createView({
		backgroundColor:'eeeded'
	});
	
	listUsersTableView = Titanium.UI.createTableView({
		minRowHeight:60,
		width:290,
		backgroundColor:'transparent',
		top:13,
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
	
	var arrayLength = typeof uData.users != 'undefined' ? uData.users.length : uData.length;
	
	for(i=0;i<arrayLength;i++){	
		var userRow = Ti.UI.createTableViewRow({
			className:'usersRow',
			height:73,
			backgroundColor:'white',
			selectedBackgroundColor:'transparent',
			userId:typeof uData.users != 'undefined' ? uData.users[i].User.id : uData[i].Dog.id,
			rowType:typeof uData.users != 'undefined' ? ROW_TYPE_USER : ROW_TYPE_DOG
		});
		
		var rowUserImage = Titanium.UI.createImageView({
			image:typeof uData.users != 'undefined' ? getUserPhoto(uData.users[i].User.thumb) : REMOTE_DOG_IMAGES+uData[i].Dog.thumb,
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		
		var rowUserNameLabel = Titanium.UI.createLabel({
			text:typeof uData.users != 'undefined' ? uData.users[i].User.name : uData[i].Dog.name,
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
	var type = e.row.rowType;
	
	//show profile view if the user, is the device owner, else show profile other view
	if(type == ROW_TYPE_USER){
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
		
		if (userId == userObject.userId ){
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
	}else if (type == ROW_TYPE_DOG){
		Ti.include('ui/iphone/dog_profile.js');
		
		var dogProfileView = buildDogProfileView(userId);
		
		var dogProfileWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR,
			title:e.row.children[1].text
		});
		
		//back button
		var dogProfileBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
	 	});
	 	
		dogProfileWindow.setLeftNavButton(dogProfileBackButton);
		
		dogProfileBackButton.addEventListener("click", function() {
		    navController.close(dogProfileWindow);
		});	
		
		dogProfileWindow.add(dogProfileView);
		openWindows.push(dogProfileWindow);
		navController.open(dogProfileWindow);
	}
}