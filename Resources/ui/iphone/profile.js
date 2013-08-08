var viewProfile = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

var profileImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");
var menuProfileImage = Titanium.UI.createImageView({
	image:profileImageFile.nativePath,
	top:0,
	//height:'52%',
	width:'100%'
});

viewProfile.add(menuProfileImage);

var profileEditButton = Ti.UI.createButton({
	title:'Edit profile',
	bottom:20,
	zIndex:2
});

viewProfile.add(profileEditButton);

var profileMapButton = Ti.UI.createButton({
	title:'Map',
	bottom:20,
	right:5,
	zIndex:2
});

viewProfile.add(profileMapButton);

var profileStartButton = Ti.UI.createButton({
	title:'Run',
	bottom:20,
	left:5,
	zIndex:2
});

viewProfile.add(profileStartButton);

profileStartButton.addEventListener('click', function(){
	var runWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Run',
		backButtonTitle:'Back'
	});
	
	runWindow.add(buildRunView());
	
	openWindows.push(runWindow);
	navController.open(runWindow);
});

profileMapButton.addEventListener('click', function(){
	var profileMapWindow = Ti.UI.createWindow({
		backgroundColor:UI_BACKGROUND_COLOR,
		url:'ui/iphone/map.js',
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Map',
		backButtonTitle:'Back'
	});
	
	openWindows.push(profileMapWindow);
	navController.open(profileMapWindow);
});

profileEditButton.addEventListener('click', function(){
	var profileEditWindow = Ti.UI.createWindow({
		url:'ui/iphone/profile_edit.js',
		backgroundColor:UI_BACKGROUND_COLOR,
		barImage:IMAGE_PATH+'common/bar.png',
		barColor:UI_COLOR,
		title:'Edit profile',
		backButtonTitle:'Back'
	});
	
	openWindows.push(profileEditWindow);
	navController.open(profileEditWindow);
});
