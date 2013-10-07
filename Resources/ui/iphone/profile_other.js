//UI components
var profileOtherDogBar = null;
var profileOtherActivityTableViewBackground = null;
var profileOtherFollowersNumberLabel = null;
var profileOtherFollowingNumberLabel = null;
var profileOtherPhotoImage = null;
var profileOtherFollowButton = null;
var profileOtherActivityTableView = null;
var profileOtherView = null;
var profileOtherWalkWithButtonLabel = null;
var profileOtherWalkWithButton = null;
var profileOtherChatButton = null;

var onlineDogs = [];

var TAB_FOLLOWERS = 1;
var TAB_FOLLOWING = 2;
var TAB_BADGES = 3;

var PROFILE_OTHER_WIN = 2;

var profileOtherUserId = null;

function buildProfileOtherView(uId, name) {
	Ti.API.info('buildProfileOtherView() called for user_id '+uId);
	
	profileOtherUserId = uId;
	if(profileOtherView == null){
		//profile other window
		profileOtherView = Ti.UI.createView({
			backgroundColor:UI_BACKGROUND_COLOR
		});
		
		//photo image
		profileOtherPhotoImage = Titanium.UI.createImageView({ 
			top:0,
			height:320,
			width:320,
			processed:false
		});
		
		profileOtherView.add(profileOtherPhotoImage);
		
		//Event handler for remote image
		profileOtherPhotoImage.addEventListener('load', function(){
			Ti.API.info('Profile_other image loaded event');
			
			if(!profileOtherPhotoImage.processed){
				Ti.API.info('Profile_other image loaded event processing');
				var profileImageViewBlob = profileOtherPhotoImage.toBlob();
				var profileImageBlobCropped = profileImageViewBlob.imageAsResized(320,320);
				profileOtherPhotoImage.image = profileImageBlobCropped;
				profileOtherPhotoImage.processed = true;
			}
		});
		
		//opacity bar
		var profileOtherOpacityBar = Titanium.UI.createView({ 
			backgroundColor:'white',
			width:'100%',
			top:195,
			height:36,
			opacity:0.8
		});
		
		var profileOtherTransparentFollowerView = Titanium.UI.createView({ 
			backgroundColor:'transparent',
			width:106,
			left:0,
			height:36,
			opacity:0.8,
			tab:TAB_FOLLOWERS
		});
		profileOtherTransparentFollowerView.addEventListener('click', handleProfileOtherFollowersFolowingTab);
		
		var profileOtherTransparentFollowingView = Titanium.UI.createView({ 
			backgroundColor:'transparent',
			width:106,
			left:107,
			height:36,
			opacity:0.8,
			tab:TAB_FOLLOWING
		});
		profileOtherTransparentFollowingView.addEventListener('click', handleProfileOtherFollowersFolowingTab);
		
		var profileOtherTransparentBadgesView = Titanium.UI.createView({ 
			backgroundColor:'transparent',
			width:106,
			right:0,
			height:36,
			opacity:0.8
		});
		
		//badges label on the opacity bar
		var profileOtherBadgesLabel = Ti.UI.createLabel({
			text:'badges',
			color:'black',
			textAlign:'center',
			width:'auto',
			height:15,
			bottom:3,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'},
			tab:TAB_FOLLOWERS
		});
		profileOtherTransparentBadgesView.add(profileOtherBadgesLabel);
		
		//number of badges label on the opacity bar
		var profileOtherBadgesNumberLabel = Ti.UI.createLabel({
			text:'3',
			color:'black',
			textAlign:'center',
			width:'auto',
			height:22,
			top:1,
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'},
			tab:TAB_FOLLOWERS
		});
		profileOtherTransparentBadgesView.add(profileOtherBadgesNumberLabel);
		profileOtherOpacityBar.add(profileOtherTransparentBadgesView);
		
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
		
		var leftOpacityBarSepparator = 106;
		
		for(i=0;i<=1;i++){
			//opacity bar sepparator
			var profileOtherOpacityBarSepparator = Titanium.UI.createView({ 
				backgroundColor:'959796',
				width:1,
				left:leftOpacityBarSepparator,
				height:34
			});
			profileOtherOpacityBar.add(profileOtherOpacityBarSepparator);
			leftOpacityBarSepparator += 107;
		}
		
		profileOtherView.add(profileOtherOpacityBar);
		
		profileOtherFollowButton = Ti.UI.createButton({
			backgroundImage: IMAGE_PATH+'profile_other/Follow_button.png',
		    width:174,
		    height:51,
		    top:250,
		    userId:uId
		});
		profileOtherView.add(profileOtherFollowButton);
		profileOtherFollowButton.addEventListener('click', handleProfileOtherFollowButton);
		
		//walk with me button
		profileOtherWalkWithButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Walk_with_icon.png',
		    width:45,
		    height:43,
		    top:IPHONE5 ? 360 : 324,
		    left:30
		});
		profileOtherView.add(profileOtherWalkWithButton);
		
		profileOtherWalkWithButton.addEventListener('click', sendWalkRequest);
		
		//walk with me button label
		profileOtherWalkWithButtonLabel = Ti.UI.createLabel({
			text:'Walk',
			color:'black',
			opacity:0.6,
			textAlign:'center',
			top:IPHONE5 ? 408 : 366,
			width:88,
			height:18,
			left:9,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherWalkWithButtonLabel);
		
		//chat button
		profileOtherChatButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Chat_icon.png',
		    width:45,
		    height:43,
		    top:IPHONE5 ? 360 : 324,
		    userId:uId,
		    left:102,
		    mName:name
		});
		profileOtherView.add(profileOtherChatButton);
		profileOtherChatButton.addEventListener('click', handleProfileOtherChatButton);
		
		//chat button label
		var profileOtherChatButtonLabel = Ti.UI.createLabel({
			text:'Chat',
			color:'black',
			opacity:0.6,
			textAlign:'center',
			top:IPHONE5 ? 408 : 366,
			width:'auto',
			height:18,
			left:111,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherChatButtonLabel);
		
		//gallery button
		var profileOtherGalleryButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Gallery_icon.png',
		    width:45,
		    height:43,
		    top:IPHONE5 ? 360 : 324,
		    right:100,
		    userId:uId
		});
		profileOtherView.add(profileOtherGalleryButton);
		profileOtherGalleryButton.addEventListener('click', handleProfileOtherGalleryButton);
		
		//gallery button label
		var profileOtherGalleryButtonLabel = Ti.UI.createLabel({
			text:'Gallery',
			color:'black',
			opacity:0.6,
			textAlign:'center',
			top:IPHONE5 ? 408 : 366,
			width:'auto',
			height:18,
			right:103,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherGalleryButtonLabel);
		
		//dogs button
		var profileOtherDogsButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'profile_other/Chat_icon.png',
		    width:45,
		    height:43,
		    right:30,
		    top:IPHONE5 ? 360 : 324,
		    userId:uId
		});
		profileOtherView.add(profileOtherDogsButton);
		profileOtherDogsButton.addEventListener('click', handleProfileOtherDogsButton);
		
		//dogs button label
		var profileOtherDogsButtonLabel = Ti.UI.createLabel({
			text:'Dogs',
			color:'black',
			opacity:0.6,
			textAlign:'center',
			top:IPHONE5 ? 408 : 366,
			width:'auto',
			right:37,
			height:18,
			font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherView.add(profileOtherDogsButtonLabel);
		
		//dogs bar
		profileOtherDogBar = Ti.UI.createButton({
			backgroundImage:IMAGE_PATH+'common/comment_field.png',
			bottom:-3,
			width:320,
			height:44,
			zIndex:3,
			toggle:false
		});
		
		var profileOtherDogBarLabel = Titanium.UI.createLabel({ 
			text:'Activity',
			color:'white',
			top:15,
			height:20,
			textAlign:'center',
			left:15,
			font:{fontSize:15, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		profileOtherDogBar.add(profileOtherDogBarLabel);
		profileOtherView.add(profileOtherDogBar);
		profileOtherDogBar.addEventListener('click', handleDogBarButton);
		
		//background of the table view
		profileOtherActivityTableViewBackground = Titanium.UI.createView({ 
			backgroundColor:UI_BACKGROUND_COLOR,
			width:'100%',
			height:IPHONE5 ? 259 : 192,
			top:IPHONE5 ? 490 : 416
		});
		profileOtherView.add(profileOtherActivityTableViewBackground);
		
		//profile other tableView
		profileOtherActivityTableView = Titanium.UI.createTableView({
			minRowHeight:51,
			width:320,
			backgroundColor:UI_BACKGROUND_COLOR,
			top:16,
			height:IPHONE5 ? 242 : 155
		});
		profileOtherActivityTableViewBackground.add(profileOtherActivityTableView);
		profileOtherActivityTableView.addEventListener('click', handleProfileOtherActivityTableViewRows);
		
		//remove empty rows
		profileOtherActivityTableView.footerView = Ti.UI.createView({
		    height: 1,
		    backgroundColor: 'transparent'
		});
	}
	getOnlineOtherUser(uId);
	
	return profileOtherView;
}

//Event handler for the walk with me button - sends a walk request to this user
function sendWalkRequest(){
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('sendWalkRequest() got an error');
	};
	
	xhr.onload = function(e) {
		Ti.API.info('sendWalkRequest() got back from server '+this.responseText);
		var jsonData = JSON.parse(this.responseText);
		
		if (jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Update UI
			profileOtherWalkWithButtonLabel.text = 'Request sent';
			profileOtherWalkWithButton.removeEventListener('click', sendWalkRequest);
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
		} else{
			alert(getErrorMessage(jsonData.response));
		}
		
	};
	xhr.open('POST',API+'walkRequest');
	xhr.send({
		user_id:userObject.userId,
		target_id:profileOtherUserId,
		token:userObject.token
	});
}

function handleDogBarButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		profileOtherDogBar.animate({bottom:-3, duration:500});
		profileOtherActivityTableViewBackground.animate({top:IPHONE5 ? 478 : 416, duration:500});
		e.source.toggle = false;
	}else{
		profileOtherDogBar.animate({bottom:IPHONE5 ? 243 : 155, duration:500});
		profileOtherActivityTableViewBackground.animate({top:245, duration:500});
		e.source.toggle = true;
	}
}

function populateProfileOtherActivityTableView(activities){
	var tableRows = [];
	
	if(activities.length > 0){
		
		for(var i=0; i < activities.length; i++){
			
			var activityRow = Ti.UI.createTableViewRow({
				className:'activityRow',
				height:71,
				width:'100%',
				backgroundColor:'white',
				selectedBackgroundColor:'transparent',
				activityId:activities[i].Activity.id
			});
			
			var rowActivityImage = Titanium.UI.createImageView({
				image:REMOTE_DOG_IMAGES + activities[i].Activity.thumb,
				defaultImage:IMAGE_PATH+'common/default_dog_photo.png',
				left:15,
				borderRadius:30,
				borderWidth:2,
				borderColor:'f5a92c'
			});	
			
			//Wrapper view with vertical layout for the text in each row
			var activityWrapperView = Ti.UI.createView({
				layout:'vertical'
			});
			
			//activity label
			var activityLabel = Ti.UI.createLabel({
				text:'Gone for a walk with '+activities[i].Activity.dogs,
				top:10,
				textAlign:'left',
				width:'auto',
				height:'auto',
				left:88,
				color:'#605353',
				font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			//time label
			var timeLabel = Ti.UI.createLabel({
				text:relativeTime(activities[i].Activity.created * 1000),
				//bottom:18,
				textAlign:'left',
				width:'auto',
				height:'auto',
				left:88,
				color:'#938787',
				font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			activityWrapperView.add(activityLabel);
			activityWrapperView.add(timeLabel);
			
			activityRow.add(rowActivityImage);
			activityRow.add(activityWrapperView);
			
			tableRows.push(activityRow);
		}
		
	} else {
		var activityRow = Ti.UI.createTableViewRow({
			className:'activityRow',
			height:51,
			width:'100%',
			backgroundColor:'e7e7e7',
			selectedBackgroundColor:'transparent'
		});
		
		//activity label
		var activityLabel = Ti.UI.createLabel({
			text:'No activity yet',
			textAlign:'left',
			width:'auto',
			height:'auto',
			opacity:0.6,
			color:'black',
			font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
		});
		
		activityRow.add(activityLabel);
		
		tableRows.push(activityRow);
		profileOtherActivityTableView.allowsSelection = false;
	}

	profileOtherActivityTableView.setData(tableRows);
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

function handleProfileOtherActivityTableViewRows(e){
	var activityId = e.row.activityId;
	Ti.include('ui/iphone/view_activity.js');
	
	var viewActivityView = buildViewActivityView(activityId);
	
	var viewActivityWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Activity'
	});
	
	//back button & event listener
	var viewActivityBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	viewActivityWindow.setLeftNavButton(viewActivityBackButton);
	viewActivityBackButton.addEventListener("click", function() {
	    navController.close(viewActivityWindow);
	});
	
	viewActivityWindow.add(viewActivityView);
	
	openWindows.push(viewActivityWindow);
	navController.open(viewActivityWindow);
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
			
			profileOtherChatButton.mutual = jsonData.data.mutual_follower;
			
			//Hide progress view
			progressView.hide();
			updateProfileOther(jsonData.data.user);
			populateProfileOtherActivityTableView(jsonData.data.activities);
			
			onlineDogs = jsonData.data.dogs;
			
			var followers = jsonData.data.count_followers;
			var inbox = jsonData.data.count_inbox;
			var notifications = jsonData.data.count_notifications;
			
			updateLeftMenuCounts(followers, inbox, notifications);
		} else if(jsonData.data.response == ERROR_REQUEST_UNAUTHORISED){
			Ti.API.error('Unauthorised request - need to login again');
			showLoginPopup();
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
		target_id:uId,
		token:userObject.token
	});
}

function updateProfileOther(userObj){
	profileOtherFollowersNumberLabel.text = userObj.followers;
	profileOtherFollowingNumberLabel.text = userObj.following;
	profileOtherPhotoImage.image = getUserPhoto(userObj.photo);
	
	if(userObj.followed != null) {
		profileOtherFollowButton.backgroundImage = IMAGE_PATH+'profile_other/Unfollow_button.png';
		profileOtherFollowButton.toggle = true;
	}else{
		profileOtherFollowButton.backgroundImage = IMAGE_PATH+'profile_other/Follow_button.png';
		profileOtherFollowButton.toggle = false;
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
		listUsersWindow.setTitle('Followers');
		getFollowers(profileOtherUserId);
	}else if(e.source.tab == TAB_FOLLOWING){
		listUsersWindow.setTitle('Following');
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

function handleProfileOtherDogsButton(e){
	
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	populateListUsersTableView(onlineDogs);
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Dogs'
	});
	
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

function handleProfileOtherChatButton(e){
	if(e.source.mutual){
		
		Ti.include('ui/iphone/inbox_new.js');
		
		var userId = e.source.userId;
		var name = e.source.mName;
		
		//inbox new window
		var inboxNewWindow = Ti.UI.createWindow({
			backgroundColor:UI_BACKGROUND_COLOR,
			barImage:IMAGE_PATH+'common/bar.png',
			barColor:UI_COLOR,
			title:'New Message'
		});
		
		//back button
		var inboxNewBackButton = Ti.UI.createButton({
		    backgroundImage: IMAGE_PATH+'common/back_button.png',
		    width:48,
		    height:33
		});
		
		inboxNewWindow.setLeftNavButton(inboxNewBackButton);
		
		inboxNewBackButton.addEventListener("click", function() {
		    navController.close(inboxNewWindow);
		    inboxNewSendToTextField.blur();
		    inboxNewChatField.blur();
		});
		
		buildViewInboxNew();
		updateInboxNewView(userId, name);
		
		inboxNewWindow.add(inboxNewView);
		
		openWindows.push(inboxNewWindow);
		navController.open(inboxNewWindow);
		
	}else{
		alert('You are not mutual followers');
	}
	
}

function handleProfileOtherGalleryButton(e){
	Ti.include('ui/iphone/gallery.js');
	
	var userId = e.source.userId;
	
	buildGalleryView(userId);
	
	var galleryWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Gallery'
	});
	
	//back button & event listener
	var galleryBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	galleryWindow.setLeftNavButton(galleryBackButton);
	galleryBackButton.addEventListener("click", function() {
	    navController.close(galleryWindow);
	});
	
	galleryWindow.add(viewGallery);
	
	openWindows.push(galleryWindow);
	navController.open(galleryWindow);
}
