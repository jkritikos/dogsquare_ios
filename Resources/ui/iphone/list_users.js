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
			defaultImage: IMAGE_PATH + typeof uData.users != 'undefined' ? 'follow_invite/default_User_photo.png' : 'common/default_dog_photo.png',
			left:3,
			borderRadius:30,
			borderWidth:2,
			borderColor:'#f9bf30'
		});
		
		userRow.add(rowUserImage);
		
		if(uData.users){
			if(uData.users[i].User.time){
				//name of the user and time
				var rowUserNameLabel = Titanium.UI.createLabel({
					text:uData.users[i].User.name,
					color:'black',
					height:22,
					top:15,
					textAlign:'left',
					width:182,
					opacity:0.6,
					left:72,
					font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'}
				});
				userRow.add(rowUserNameLabel);
				
				var rowUserTimeLabel = Titanium.UI.createLabel({
					text:relativeTime(uData.users[i].User.time),
					color:'#938787',
					height:22,
					textAlign:'left',
					width:182,
					bottom:15,
					left:72,
					font:{fontSize:12, fontWeight:'regular', fontFamily:'Open Sans'}
				});
				userRow.add(rowUserTimeLabel);
			}else{
				//name for users
				var rowUserNameLabel = Titanium.UI.createLabel({
					text:uData.users[i].User.name,
					color:'black',
					height:22,
					textAlign:'left',
					width:182,
					opacity:0.6,
					left:72,
					font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'}
				});
				userRow.add(rowUserNameLabel);
				
			}
		}else{
			//name for dogs
			var rowUserNameLabel = Titanium.UI.createLabel({
				text:uData[i].Dog.name,
				color:'black',
				height:22,
				textAlign:'left',
				width:182,
				opacity:0.6,
				left:72,
				font:{fontSize:14, fontWeight:'regular', fontFamily:'Open Sans'}
			});
			userRow.add(rowUserNameLabel);
			
		}
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
			//barImage:IMAGE_PATH+'common/bar.png',
			translucent:false,
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
			
			var nameUser = e.row.children[1].text;
			var profileOtherView = buildProfileOtherView(userId,nameUser);
			
			profileWindow.add(profileOtherView);
			profileWindow.setTitle(nameUser);
			
			openWindows.push(profileWindow);
			navController.open(profileWindow);
		}
	}else if (type == ROW_TYPE_DOG){
		Ti.include('ui/iphone/dog_profile.js');
		
		var dogProfileView = buildDogProfileView(userId, false);
		
		var dogProfileWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			//barImage:IMAGE_PATH+'common/bar.png',
			translucent:false,
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