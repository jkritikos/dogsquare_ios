var viewProfile = Ti.UI.createView({
	backgroundColor:'white'
});

var profileLabel = Ti.UI.createLabel({
	text:'profile'
});

viewProfile.add(profileLabel);

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
		backgroundColor:'white',
		url:'ui/iphone/run.js',
		barColor:'#28292c',
		title:'Run',
		backButtonTitle:'Back'
	});
	
	openWindows.push(runWindow);
	navController.open(runWindow);
});

profileMapButton.addEventListener('click', function(){
	var profileMapWindow = Ti.UI.createWindow({
		backgroundColor:'white',
		url:'ui/iphone/map.js',
		barColor:'#28292c',
		title:'Map',
		backButtonTitle:'Back'
	});
	
	openWindows.push(profileMapWindow);
	navController.open(profileMapWindow);
});

profileEditButton.addEventListener('click', function(){
	var profileEditWindow = Ti.UI.createWindow({
		url:'ui/iphone/profile_edit.js',
		backgroundColor:'red',
		barColor:'#28292c',
		title:'Edit profile',
		backButtonTitle:'Back'
	});
	
	openWindows.push(profileEditWindow);
	navController.open(profileEditWindow);
});
