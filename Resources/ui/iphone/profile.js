var viewProfile = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

var TAB_FOLLOWERS = 1;
var TAB_FOLLOWING = 2;

var profileImageView = Titanium.UI.createImageView({
	image:REMOTE_USER_IMAGES + userObject.image_path,
	top:0,
	height:320,
	width:320,
	processed:false
});

viewProfile.add(profileImageView);

//Event handler for remote image
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
	text:userObject.followers,
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
	text:userObject.following,
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
	backgroundImage:IMAGE_PATH+'profile/map_button.png',
	width:108,
	height:49,
	top:245,
	right:12,
	zIndex:5
});

viewProfile.add(profileMapButton);

//Start button
var profileStartButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/start_button.png',
	top:243,
	width:178,
	height:52,
	left:15,
	zIndex:5
});

viewProfile.add(profileStartButton);

viewProfile.add(profileOpacityBarBottom);

//Activity bar
var profileActivityBar = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/Activitybar.png',
	top:307,
	width:320,
	height:33,
	toggle:false,
	zIndex:6
});

var profileActivityLabel = Titanium.UI.createLabel({ 
	text:'Activity',
	color:'white',
	top:13,
	height:20,
	textAlign:'center',
	left:29,
	font:{fontSize:14, fontWeight:'semibold', fontFamily:'Open Sans'}
});
profileActivityBar.add(profileActivityLabel);

viewProfile.add(profileActivityBar);
profileActivityBar.addEventListener('click', handleActivityButton);

//background of the table view
var profileTableViewBackground = Titanium.UI.createView({ 
	backgroundColor:'d2d2d2',
	width:'100%',
	height:74,
	top:339,
	zIndex:6
});
viewProfile.add(profileTableViewBackground);

//profile tableView
var profileTableView = Titanium.UI.createTableView({
	minRowHeight:71,
	width:320,
	data:populateProfileTableView(),
	backgroundColor:'d2d2d2',
	top:3,
	bottom:0
});
profileTableViewBackground.add(profileTableView);
profileTableView.addEventListener('click', handleProfileActivityRows);

var runWindow = null;

profileStartButton.addEventListener('click', function(){
	runWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Run'
	});
	
	//back button
	var runBackButton = Ti.UI.createButton({
	    backgroundImage: IMAGE_PATH+'common/back_button.png',
	    width:48,
	    height:33
	});
	
	runWindow.setLeftNavButton(runBackButton);
	runBackButton.addEventListener("click", handleRunBackButton);
	
	runWindow.add(buildRunView());
	
	openWindows.push(runWindow);
	navController.open(runWindow);
});

profileMapButton.addEventListener('click', function(){
	var profileMapWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Map'
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
	
	Ti.include('ui/iphone/map.js');
	buildMapView(TARGET_MODE_NEW_WINDOW);
	
	profileMapWindow.setTitleControl(mapSearchContainer);
	profileMapWindow.add(viewMap);
	openWindows.push(profileMapWindow);
	navController.open(profileMapWindow);
});

function handleRunBackButton() {
	if(runningMode){
		alert('STOP RUNNING FIRST');
	} else {
		navController.close(runWindow);
	}
}

function handleActivityButton(e){
	var toggle = e.source.toggle;
	if(toggle){
		profileActivityBar.animate({top:307, duration:500});
		profileTableViewBackground.height = 69;
		profileTableViewBackground.animate({top:339, duration:470});
		e.source.toggle = false;
	}else{
		profileActivityBar.animate({top:187, duration:500});
		profileTableViewBackground.height = 196;
		profileTableViewBackground.animate({top:220, duration:460});
		e.source.toggle = true;
	}
}

function populateProfileTableView(){
	var userActivities = getActivities();
	var tableRows = [];
	
	if(userActivities.length > 0){
		
		for(var i=0; i < userActivities.length; i++){
			
			var dogNames = '';
			var dogPhoto = '';
			var dogInfo = userActivities[i].dogs;
			for(var z=0; z < dogInfo.length; z++){
				dogNames += dogInfo[z].name + ', ';
				dogPhoto = dogInfo[z].photo;
			}
			
			dogNames = dogNames.substr(0, dogNames.length-2);
			
			var activityRow = Ti.UI.createTableViewRow({
				className:'activityRow',
				height:71,
				width:'100%',
				backgroundColor:'white',
				selectedBackgroundColor:'transparent',
				activityId:userActivities[i].activity_id
			});
			
			var rowActivityImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + dogPhoto);
			var rowActivityImageBlob = rowActivityImageFile.toBlob();
			var rowActivityImageBlobCropped = rowActivityImageBlob.imageAsThumbnail(54,0,27);
			var rowActivityImage = Titanium.UI.createImageView({
				image:rowActivityImageBlobCropped,
				left:25,
				borderRadius:27,
				borderWidth:3,
				borderColor:'f5a92c'
			});	
			
			//Wrapper view with vertical layout for the text in each row
			var activityWrapperView = Ti.UI.createView({
				layout:'vertical'
			});
			
			//activity label
			var activityLabel = Ti.UI.createLabel({
				text:'Gone for a walk with '+dogNames,
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
				text:relativeTime(userActivities[i].start_time),
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
			//activityRow.add(activityLabel);
			//activityRow.add(timeLabel);
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
	}

	return tableRows;
}

function handleProfileActivityRows(e){
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
	//openWindows[0] = viewActivityWindow;
	navController.open(viewActivityWindow);
}

function handleFollowersFolowingTab(e){
	var userId = userObject.userId;
	
	Ti.include('ui/iphone/list_users.js');
	
	var listUsersView = buildListUsersView();
	
	var listUsersWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		barImage:IMAGE_PATH+'common/bar.png',
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
