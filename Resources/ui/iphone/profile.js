var viewProfile = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

var TAB_FOLLOWERS = 1;
var TAB_FOLLOWING = 2;

var profileImageView = Titanium.UI.createImageView({
	image:getUserPhoto(userObject.image_path),
	defaultImage:IMAGE_PATH+'common/white_default.png',
	top:0,
	height:320,
	width:320,
	processed:false
});

viewProfile.add(profileImageView);

var profileEditButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/edit_icon.png',
	width:24,
	height:23
});
//navController.getWindow().rightNavButton = profileEditButton;
profileEditButton.addEventListener('click', handleProfileEditButton);

//Photo dialog with options for viewing/changing the profile image
var profilePhotoDialog = Titanium.UI.createOptionDialog({
	options:['View', 'Take Photo', 'Choose From Library', 'Cancel'],
	cancel:3
});

//Event listener for profile photo dialog options	
profilePhotoDialog.addEventListener('click',function(e){
	if(e.index == 0){
		profilePhotoView();
	} else if(e.index == 1){
		profilePhotoTakeNew();
	} else if(e.index == 2){
		profilePhotoChooseExisting();
	}
});

//Event handler for remote image - resizes it to the appropriate dimensions
profileImageView.addEventListener('load', function(){
	Ti.API.info('Profile image loaded event');
	
	if(!profileImageView.processed){
		var profileImageViewBlob = profileImageView.toBlob();
		//profileImageView.image = profileImageViewBlob;
		
		//Cropping
		//var profileImageBlobCropped = profileImageViewBlob.imageAsCropped({y:0,x:0,height:440});
		//profileImageView.image = profileImageBlobCropped;
		
		//Resizing imageAsResized
		var profileImageBlobCropped = profileImageViewBlob.imageAsResized(320,320);
		profileImageView.image = profileImageBlobCropped;
		
		profileImageView.processed = true;
		
		Ti.API.info('Profile image loaded event processing. Image height:'+profileImageViewBlob.height+' width '+profileImageViewBlob.width + ' cropped to height '+profileImageBlobCropped.height + ' and width '+profileImageBlobCropped.width);
	}
});

//Event listener for profile image - brings up a dialog for viewing or changing the profile image
profileImageView.addEventListener('click', function(){
	profilePhotoDialog.show();
});

//opacity bar
var profileOpacityBar = Titanium.UI.createView({ 
	backgroundColor:'white',
	width:'100%',
	top:195,
	height:36,
	opacity:0.8
});

var profileTransparentFollowerView = Titanium.UI.createView({ 
	backgroundColor:'transparent',
	width:159,
	left:0,
	height:36,
	opacity:0.8,
	tab:TAB_FOLLOWERS
});
profileOpacityBar.add(profileTransparentFollowerView);
profileTransparentFollowerView.addEventListener('click', handleFollowersFolowingTab);

var profileTransparentFollowingView = Titanium.UI.createView({ 
	backgroundColor:'transparent',
	width:160,
	right:0,
	height:36,
	opacity:0.8,
	tab:TAB_FOLLOWING
});
profileOpacityBar.add(profileTransparentFollowingView);
profileTransparentFollowingView.addEventListener('click', handleFollowersFolowingTab);

//followers label on the opacity bar
var profileOpacityBarLabel1 = Ti.UI.createLabel({
	text:'followers',
	color:'black',
	textAlign:'center',
	width:'auto',
	height:15,
	bottom:3,
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'},
	tab:TAB_FOLLOWERS
});
profileTransparentFollowerView.add(profileOpacityBarLabel1);

//number of followers label on the opacity bar
var profileOpacityBarNumberLabel1 = Ti.UI.createLabel({
	color:'black',
	textAlign:'center',
	width:'auto',
	height:22,
	top:1,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'},
	tab:TAB_FOLLOWERS
});
profileTransparentFollowerView.add(profileOpacityBarNumberLabel1);

//following label on the opacity bar
var profileOpacityBarLabel2 = Ti.UI.createLabel({
	text:'following',
	color:'black',
	textAlign:'left',
	width:'auto',
	height:15,
	bottom:3,
	font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'},
	tab:TAB_FOLLOWING
});
profileTransparentFollowingView.add(profileOpacityBarLabel2);

//number of following label on the opacity bar
Ti.API.info('Creating profile view - using object = '+JSON.stringify(userObject));
var profileOpacityBarNumberLabel2 = Ti.UI.createLabel({
	color:'black',
	textAlign:'center',
	width:'auto',
	height:22,
	top:1,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'},
	tab:TAB_FOLLOWING
});
profileTransparentFollowingView.add(profileOpacityBarNumberLabel2);

//opacity bar sepparator
var profileOpacityBarSepparator = Titanium.UI.createView({ 
	backgroundColor:'959796',
	width:1,
	height:34
});
profileOpacityBar.add(profileOpacityBarSepparator);

viewProfile.add(profileOpacityBar);

//opacity bar for buttons
var profileOpacityBarBottom = Titanium.UI.createView({ 
	backgroundColor:'white',
	width:'100%',
	top:240,
	height:60,
	opacity:0.8
});

//Map button
var profileMapButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/woofin_button_orange.png',
	width:108,
	height:49,
	top:245,
	right:12,
	zIndex:5
});

viewProfile.add(profileMapButton);

//Start button
var profileStartButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/start_activity_green.png',
	top:243,
	width:178,
	height:52,
	left:12,
	zIndex:5
});

viewProfile.add(profileStartButton);

viewProfile.add(profileOpacityBarBottom);

//Activity bar
var profileActivityBar = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'common/comment_field.png',
	top:307,
	width:320,
	height:44,
	toggle:false,
	zIndex:7
});

var profileActivityLabel = Titanium.UI.createLabel({ 
	text:'Activity',
	color:'white',
	top:15,
	height:20,
	textAlign:'center',
	left:18,
	font:UI_FONT_BARS
});
profileActivityBar.add(profileActivityLabel);

viewProfile.add(profileActivityBar);
profileActivityBar.addEventListener('click', handleActivityButton);

//background of the table view
var profileTableViewBackground = Titanium.UI.createView({ 
	backgroundColor:'d2d2d2',
	width:'100%',
	height:IPHONE5 ? 256 : 170,
	top:337,
	zIndex:6
});
viewProfile.add(profileTableViewBackground);

//profile tableView
var profileTableView = Titanium.UI.createTableView({
	minRowHeight:71,
	maxRowHeight:91,
	width:320,
	backgroundColor:'d2d2d2',
	top:13,
	height:IPHONE5 ? 154 : 66
});
profileTableViewBackground.add(profileTableView);
profileTableView.addEventListener('click', handleProfileActivityRows);

//remove empty rows
profileTableView.footerView = Ti.UI.createView({
    height: 1,
    backgroundColor: 'transparent'
});

getOnlineUser();

var runWindow = null;

profileStartButton.addEventListener('click', function(){
	CURRENT_VIEW = VIEW_RUN;
	Ti.include('ui/iphone/run.js');
	
	runWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Activity'
	});
	
	//back button
	var runBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	runWindow.setLeftNavButton(runBackButton);
	runWindow.setRightNavButton(rightBtn);
	
	runBackButton.addEventListener("click", handleRunBackButton);
	
	runWindow.add(buildRunView());
	
	openWindows.push(runWindow);
	navController.open(runWindow);
});

profileMapButton.addEventListener('click', function(){
	Ti.include('ui/iphone/map.js');
	buildMapView(TARGET_MODE_NEW_WINDOW);
	
	var profileMapWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		translucent:false
	});
	
	//map back button
	var profileMapBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	profileMapWindow.setLeftNavButton(profileMapBackButton);
	
	profileMapBackButton.addEventListener("click", function() {
		navController.getWindow().setTitleControl();
	    navController.close(profileMapWindow);
	});
	
	profileMapWindow.setTitleControl(mapSearchContainer);
	profileMapWindow.add(viewMap);
	openWindows.push(profileMapWindow);
	navController.open(profileMapWindow);
});

function handleRunBackButton() {
	if(runningMode){
		alert(getLocalMessage(MSG_RUN_NOT_ENDED));
	} else {
		navController.close(runWindow);
	}
}

function handleActivityButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		profileActivityBar.animate({top:307, duration:500});
		profileTableViewBackground.animate({top:337, duration:500});
		profileTableView.animate({height:IPHONE5 ? 154 : 66, duration:500});
		e.source.toggle = false;
	}else{
		profileActivityBar.animate({top:218, duration:500});
		profileTableViewBackground.animate({top:248, duration:500});
		profileTableView.animate({height:IPHONE5 ? 243 : 155, duration:100});
		e.source.toggle = true;
	}
}

function populateProfileTableView(activities){
	var tableRows = [];
	
	if(activities.length > 0){
		for(var i=0; i < activities.length; i++){
			
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
				layout:'vertical',
				top:0,
				bottom:0
			});
			
			//activity label
			var activityLabel = Ti.UI.createLabel({
				text:'Went for a walk with '+activities[i].Activity.dogs,
				top:10,
				textAlign:'left',
				width:211,
				height:'auto',
				left:88,
				color:'#605353',
				font:{fontSize:13, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			//time label
			var timeLabel = Ti.UI.createLabel({
				text:relativeTime(activities[i].Activity.created * 1000),
				textAlign:'left',
				width:'auto',
				height:'auto',
				left:88,
				color:'#938787',
				font:{fontSize:11, fontWeight:'semibold', fontFamily:'Open Sans'}
			});
			
			var rowHeight = Math.round((activityLabel.text.length / 20) * 25);
			var activityRow = Ti.UI.createTableViewRow({
				className:'activityRow',
				height:rowHeight,
				width:'100%',
				backgroundColor:'white',
				selectedBackgroundColor:'transparent',
				activityId:activities[i].Activity.id
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
		profileTableView.allowsSelection = false;
	}

	profileTableView.setData(tableRows);
}

function handleProfileActivityRows(e){
	var activityId = e.row.activityId;
	Ti.include('ui/iphone/view_activity.js');
	
	var viewActivityView = buildViewActivityView(activityId);
	
	var viewActivityWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR,
		title:'Activity details'
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
	//openWindows[0] = viewActivityWindow;
	navController.open(viewActivityWindow);
}

function handleFollowersFolowingTab(e){
	var userId = userObject.userId;
	
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		//barImage:IMAGE_PATH+'common/bar.png',
		translucent:false,
		barColor:UI_COLOR
	});
	
	if(e.source.tab == TAB_FOLLOWERS){
		listUsersWindow.setTitle('Followers');
		getFollowers(userId);
	}else if(e.source.tab == TAB_FOLLOWING){
		listUsersWindow.setTitle('Following');
		getFollowing(userId);
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

//get other user info by id from server
function getOnlineUser(){
	Ti.API.info('getOnlineUser() called'); 	
	//progress view
	var progressView = new ProgressView({window:viewProfile});
	progressView.show({
		text:"Loading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('getOnlineUser() got back error '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
		navController.getWindow().setTitle('');
	};
	
	xhr.onload = function(e){	
		var jsonData = JSON.parse(this.responseText);
		Ti.API.info('getOnlineUser() got back from server '+this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Hide progress view
			progressView.hide();
			
			populateProfileTableView(jsonData.data.activities);
			
			profileOpacityBarNumberLabel1.text = jsonData.data.user.followers;
			profileOpacityBarNumberLabel2.text = jsonData.data.user.following;
			
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
	xhr.open('GET',API+'getUser');
	xhr.send({
		user_id:userObject.userId,
		token:userObject.token
	});
}

function profilePhotoView(){
	var image = profileImageView.image;
		
	Ti.include('ui/iphone/photo_view.js');
	buildPhotoView(image);

	//if(iOS7){
		photoNavWin.open();
	//}else{
	//	photoViewWindow.open();
	//}
}

//Takes a new photo and uploads it as the new profile image
function profilePhotoTakeNew(){
	Titanium.Media.showCamera({
		success:function(event){
			var image = event.media;
			
			//Reduce image size first
			Ti.API.info('Took image with h:'+image.height+' w:'+image.width);
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			var editUserObject = {
				user_id:userObject.userId,
				token:userObject.token,
				photo:compressedImage,
				thumb:imageThumbnail,
				image_path:Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg",
				thumb_path:Titanium.Filesystem.applicationDataDirectory + "pic_profile_thumb.jpg",
				edit:false //only editing the photo
			};
			
			//Save images on the filesystem
			var tmpImage = Titanium.Filesystem.getFile(editUserObject.image_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(editUserObject.thumb_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			
			tmpImage.write(imageThumbnail);
			
			//Upload
			changeProfilePhoto(editUserObject);
		},
		cancel:function(){
	
		},
		error:function(error){
			alert(getLocalMessage(MSG_CAMERA_PROBLEM));
		},
		allowEditing:true
	});
}

//Selects a photo from the camera roll and uploads it as the new profile image
function profilePhotoChooseExisting(){
	Titanium.Media.openPhotoGallery({	
		
		success:function(event){
			var image = event.media;
			
			//Jpeg compression module
			var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
			jpgcompressor.setCompressSize(100000);
			jpgcompressor.setWorstCompressQuality(0.40);
			
			var compressedImage = jpgcompressor.compress(image);
			
			//Create thumbnail
			var imageThumbnail = image.imageAsThumbnail(60,0,30);
			
			var editUserObject = {
				user_id:userObject.userId,
				token:userObject.token,
				photo:compressedImage,
				thumb:imageThumbnail,
				image_path:Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg",
				thumb_path:Titanium.Filesystem.applicationDataDirectory + "pic_profile_thumb.jpg",
				edit:false //only editing the photo
			};
			
			//Save images on the filesystem
			var tmpImage = Titanium.Filesystem.getFile(editUserObject.image_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			tmpImage.write(compressedImage);
			
			tmpImage = Titanium.Filesystem.getFile(editUserObject.thumb_path);
			if(tmpImage.exists()){
				tmpImage.deleteFile();
			}
			
			tmpImage.write(imageThumbnail);
			
			//Upload
			changeProfilePhoto(editUserObject);
		},
		cancel:function(){
	
		},
		error:function(error){
		},
		allowEditing:true
	});
}

//Uploads a new profile image for the current user
function changeProfilePhoto(obj){
	Ti.API.info('changeProfilePhoto() called'); 	
	
	//progress view
	var progressView = new ProgressView({window:viewProfile});
	progressView.show({
		text:"Uploading..."
	});
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.setTimeout(NETWORK_TIMEOUT);
	
	xhr.onerror = function(e){
		Ti.API.error('changeProfilePhoto() got back error '+e);
		progressView.hide();
		alert(getLocalMessage(MSG_NO_INTERNET_CONNECTION));
	};
	
	xhr.onload = function(e){
		var jsonData = JSON.parse(this.responseText);
		Ti.API.info('changeProfilePhoto() got back from server '+this.responseText);
		
		if(jsonData.data.response == NETWORK_RESPONSE_OK){
			
			//Hide progress view
			progressView.hide();
			
			//Change the profile image on the UI
			profileImageView.image = obj.image_path;
			
			//Save data & update UI
			var o = {
				image_path:jsonData.data.photo,
				thumb_path:jsonData.data.thumb,
				name:userObject.name,
				followers:jsonData.data.count_followers
			};
			saveUserObject(o);
			updateLeftMenu(o);
			
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
	
	xhr.setRequestHeader("Content-Type", "multipart/form-data");
	xhr.open('POST',API+'editUser');
	xhr.send(obj);
}

function handleProfileEditButton(){
	Ti.API.info('handleProfileEditButton() called ');
	
	Ti.include('ui/iphone/profile_edit.js');
	
	var editProfileView = buildEditProfileView(VIEW_PROFILE);
	
	var editProfileWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Edit profile'
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
