
var profileOtherDogBar = null;
var profileOtherDogTableViewBackground = null;
var profileOtherFollowersNumberLabel = null;
var profileOtherFollowingNumberLabel = null;
var profileOtherPhotoImage = null;
var profileOtherFollowButton = null;
var profileOtherDogTableView = null;
var profileOtherView = null;

var TAB_FOLLOWERS = 1;
var TAB_FOLLOWING = 2;

var PROFILE_OTHER_WIN = 2;

var profileOtherUserId = null;

function buildProfileOtherView(uId) {
	profileOtherUserId = uId;
	if(profileOtherView == null){
		//profile other window
		profileOtherView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//photo image
		profileOtherPhotoImage = Titanium.UI.createImageView({ 
			width:320,
			height:217,
			top:0
		});
		profileOtherView.add(profileOtherPhotoImage);
		
		//opacity bar
		var profileOtherOpacityBar = Titanium.UI.createView({ 
			backgroundColor:'white',
			width:'100%',
			top:170,
			height:36,
			opacity:0.8
		});
		
		var profileOtherTransparentFollowerView = Titanium.UI.createView({ 
			backgroundColor:'transparent',
			width:159,
			left:0,
			height:36,
			opacity:0.8,
			tab:TAB_FOLLOWERS
		});
		profileOtherTransparentFollowerView.addEventListener('click', handleProfileOtherFollowersFolowingTab);
		
		var profileOtherTransparentFollowingView = Titanium.UI.createView({ 
			backgroundColor:'transparent',
			width:160,
			right:0,
			height:36,
			opacity:0.8,
			tab:TAB_FOLLOWING
		});
		profileOtherTransparentFollowingView.addEventListener('click', handleProfileOtherFollowersFolowingTab);
		
		//followers label on the opacity bar
		var profileOtherFollowersLabel = Ti.UI.createLabel({
			text:'followers',
			color:'black',
			textAlign:'center',
			width:'auto',
			height:15,
			bottom:3,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'},
			tab:TAB_FOLLOWERS
		});
		profileOtherTransparentFollowerView.add(profileOtherFollowersLabel);
		
		//number of followers label on the opacity bar
		profileOtherFollowersNumberLabel = Ti.UI.createLabel({
			color:'black',
			textAlign:'center',
			width:'auto',
			height:22,
			top:1,
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'},
			tab:TAB_FOLLOWERS
		});
		profileOtherTransparentFollowerView.add(profileOtherFollowersNumberLabel);
		profileOtherOpacityBar.add(profileOtherTransparentFollowerView);
		
		//following label on the opacity bar
		var profileOtherFollowingLabel = Ti.UI.createLabel({
			text:'following',
			color:'black',
			textAlign:'left',
			width:'auto',
			height:15,
			bottom:3,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'},
			tab:TAB_FOLLOWING
		});
		profileOtherTransparentFollowingView.add(profileOtherFollowingLabel);
		
		//number of following label on the opacity bar
		profileOtherFollowingNumberLabel = Ti.UI.createLabel({
			color:'black',
			textAlign:'center',
			width:'auto',
			height:22,
			top:1,
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'},
			tab:TAB_FOLLOWING
		});
		profileOtherTransparentFollowingView.add(profileOtherFollowingNumberLabel);
		profileOtherOpacityBar.add(profileOtherTransparentFollowingView);
		
		//opacity bar sepparator
		var profileOtherOpacityBarSepparator = Titanium.UI.createView({ 
			backgroundColor:'959796',
			width:1,
			height:34
		});
		profileOtherOpacityBar.add(profileOtherOpacityBarSepparator);
		profileOtherView.add(profileOtherOpacityBar);
		
		profileOtherFollowButton = Ti.UI.createButton({
			backgroundImage: IMAGE_PATH+'profile_other/Follow_button.png',
		    width:174,
		    height:51,
		    top:229,
		    userId:uId
		});
		profileOtherView.add(profileOtherFollowButton);
		profileOtherFollowButton.addEventListener('click', handleProfileOtherFollowButton);
		
		//chat button
		var profileOtherChatButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Chat_icon.png',
		    width:45,
		    height:43,
		    top:310
		});
		profileOtherView.add(profileOtherChatButton);
		
		//chat button label
		var profileOtherChatButtonLabel = Ti.UI.createLabel({
			text:'Chat with me',
			color:'black',
			opacity:0.6,
			textAlign:'center',
			top:354,
			width:88,
			height:18,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherChatButtonLabel);
		
		//walk with me button
		var profileOtherWalkWithButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Walk_with_icon.png',
		    width:45,
		    height:43,
		    top:310,
		    left:42
		});
		profileOtherView.add(profileOtherWalkWithButton);
		
		//walk with me button label
		var profileOtherWalkWithButtonLabel = Ti.UI.createLabel({
			text:'Walk with me',
			color:'black',
			opacity:0.6,
			textAlign:'left',
			top:354,
			width:88,
			height:18,
			left:21,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherWalkWithButtonLabel);
		
		//gallery button
		var profileOtherGalleryButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Gallery_icon.png',
		    width:45,
		    height:43,
		    top:310,
		    right:42
		});
		profileOtherView.add(profileOtherGalleryButton);
		
		//gallery button label
		var profileOtherGalleryButtonLabel = Ti.UI.createLabel({
			text:'Gallery',
			color:'black',
			opacity:0.6,
			textAlign:'center',
			top:354,
			width:88,
			height:18,
			right:21,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherGalleryButtonLabel);
		
		//dogs bar
		profileOtherDogBar = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
			bottom:0,
			width:320,
			height:33,
			toggle:false
		});
		
		var profileOtherDogBarLabel = Titanium.UI.createLabel({ 
			text:'Dogs',
			color:'white',
			top:13,
			height:20,
			textAlign:'center',
			left:15,
			font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherDogBar.add(profileOtherDogBarLabel);
		profileOtherView.add(profileOtherDogBar);
		profileOtherDogBar.addEventListener('click', handleDogBarButton);
		
		//background of the table view
		profileOtherDogTableViewBackground = Titanium.UI.createView({ 
			backgroundColor:'d2d2d2',
			width:'100%',
			height:192,
			top:416
		});
		profileOtherView.add(profileOtherDogTableViewBackground);
		
		//profile other tableView
		profileOtherDogTableView = Titanium.UI.createTableView({
			minRowHeight:51,
			width:320,
			separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
			backgroundColor:'d2d2d2',
			top:3,
			bottom:0
		});
		profileOtherDogTableViewBackground.add(profileOtherDogTableView);
		profileOtherDogTableView.addEventListener('click', handleProfileOtherDogTableViewRows);
	}
	getOnlineOtherUser(uId);
	
	return profileOtherView;
}

function handleDogBarButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		profileOtherDogBar.animate({bottom:0, duration:500});
		profileOtherDogTableViewBackground.animate({top:416, duration:500});
		e.source.toggle = false;
	}else{
		profileOtherDogBar.animate({bottom:192, duration:500});
		profileOtherDogTableViewBackground.animate({top:224, duration:500});
		e.source.toggle = true;
	}
}

function populateProfileOtherDogTableView(dogsObj){
	var tableRows = [];
	
	for(i=0;i<dogsObj.length;i++){
		
		var dogRow = Ti.UI.createTableViewRow({
			className:'dogRow',
			height:73,
			width:'100%',
			backgroundColor:'e7e7e7',
			selectedBackgroundColor:'transparent',
			dogId:dogsObj[i].Dog.id
		});
		
		var rowDogImage = Titanium.UI.createImageView({
			image:REMOTE_DOG_IMAGES + dogsObj[i].Dog.thumb,
			left:15,
			top:6,
			borderRadius:30,
			borderWidth:2,
			borderColor:'f9bf30'
		});	
		
		//sepparator
		var rowSepparator = Titanium.UI.createView({ 
			backgroundColor:'d2d2d2',
			width:'100%',
			bottom:0,
			height:3
		});
		
		//dog name label
		var dogNameLabel = Ti.UI.createLabel({
			text:dogsObj[i].Dog.name,
			top:32,
			textAlign:'left',
			width:'auto',
			height:'auto',
			left:120,
			opacity:0.6,
			color:'black',
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		dogRow.add(rowDogImage);
		dogRow.add(rowSepparator);
		dogRow.add(dogNameLabel);
		
		tableRows.push(dogRow);
	}
	profileOtherDogTableView.setData(tableRows);
}

//handle follow button
function handleProfileOtherFollowButton(e){
	
	if(e.source.userId != null){
		var userId = e.source.userId;
		var win = PROFILE_OTHER_WIN;
		
		if(e.source.toggle){
			unfollowUser(userId, e.source, win);
			profileOtherFollowersNumberLabel.text --;
			e.source.toggle = false;
		}else{
			followUser(userId, e.source, win);
			e.source.toggle = true;
			profileOtherFollowersNumberLabel.text ++;
		}
	}
}

function handleProfileOtherFollowersFolowingTab(e){
	
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR
	});
	
	if(e.source.tab == TAB_FOLLOWERS){
		listUsersWindow.setTitle('followers');
		getFollowers(profileOtherUserId);
	}else if(e.source.tab == TAB_FOLLOWING){
		listUsersWindow.setTitle('following');
		getFollowing(profileOtherUserId);
	}
	
	//back button & event listener
	var listUsersBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	listUsersWindow.setLeftNavButton(listUsersBackButton);
	listUsersBackButton.addEventListener("click", function() {
	    navController.close(listUsersWindow);
	});
	
	listUsersWindow.add(listUsersView);
	
	openWindows.push(listUsersWindow);
	navController.open(listUsersWindow);
}

function handleProfileOtherDogTableViewRows(e){
	var dogId = e.row.dogId;
	
	Ti.include('ui/iphone/dog_profile.js');
	var dogProfileView = buildDogProfileView(dogId);
	
	var dogProfileWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:e.row.children[2].text
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

//get other user info by id from server
function getOnlineOtherUser(uId){
	Ti.API.info('getOnlineOtherUser() called for target_id='+ uId); 	
	//progress view
	var progressView = new ProgressView({window:profileOtherView});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		navController.getWindow().setTitle('');
	};
	
	xhr.onload = function(e){
			
		var jsonData = JSON.parse(this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			//Hide progress view
			progressView.hide();
			updateProfileOther(jsonData.data.user);
			populateProfileOtherDogTableView(jsonData.data.dogs);
		} else {
			//Show the error message we got back from the server
			progressView.change({
		        error:true,
		        text:getErrorMessage(jsonData.data.response)
		    });
		    
			//and hide it after a while		    
		    setTimeout(function() {
			    progressView.hide();
			}, ERROR_MSG_REMOVE_TIMEOUT);
		}
		
	};
	xhr.open('GET',API+'getOtherUser');
	xhr.send({
		user_id:userObject.userId,
		target_id:uId
	});
}

function updateProfileOther(userObj){
	profileOtherFollowersNumberLabel.text = userObj.followers;
	profileOtherFollowingNumberLabel.text = userObj.following;
	profileOtherPhotoImage.image = REMOTE_USER_IMAGES + userObj.photo;
	
	if(userObj.followed != null) {
		profileOtherFollowButton.backgroundImage = IMAGE_PATH+'profile_other/Unfollow_button.png';
		profileOtherFollowButton.toggle = true;
	}else{
		profileOtherFollowButton.backgroundImage = IMAGE_PATH+'profile_other/Follow_button.png';
		profileOtherFollowButton.toggle = false;
	}
 	
}
