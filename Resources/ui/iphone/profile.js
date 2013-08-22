var viewProfile = Ti.UI.createView({
	backgroundColor:UI_BACKGROUND_COLOR
});

var profileImageFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "pic_profile.jpg");

var profileImageView = Titanium.UI.createImageView({
	image:profileImageFile.nativePath,
	top:0,
	width:'100%'
});

var profileImageViewBlob = profileImageView.toBlob();
var profileImageBlobCropped = profileImageViewBlob.imageAsCropped({y:0,x:0,height:1650});
profileImageView.image = profileImageBlobCropped;

viewProfile.add(profileImageView);

//Map button
var profileMapButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/Map_icon.png',
	width:33,
	height:32,
	bottom:130,
	right:45,
	zIndex:2
});

viewProfile.add(profileMapButton);

//Start button
var profileStartButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'profile/start_button.png',
	bottom:115,
	width:178,
	height:52,
	left:15,
	zIndex:2
});

viewProfile.add(profileStartButton);

//Activity bar
var profileActivityBar = Ti.UI.createImageView({
	image:IMAGE_PATH+'profile/Activitybar.png',
	bottom:70
});

viewProfile.add(profileActivityBar);

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

function handleRunBackButton() {
    navController.close(runWindow);
}

/*
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
*/