var initialWindow = Ti.UI.createWindow({
	backgroundImage:IPHONE5? IMAGE_PATH+'intro_login/Default-568h@2x.png' : IMAGE_PATH+'intro_login/Default.png'
});

var graphicPeopleImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'intro_login/graphic_people.png',
	bottom:32,
	zIndex:0
});

initialWindow.add(graphicPeopleImage);

//Set up the loading bar frames for animation
var barImages = [];
for(var tt=1; tt <= 57; tt++){
	var targetSlice = IMAGE_PATH+'intro_login/bar/'+tt+'.png';
	barImages.push(targetSlice);
}
var loadingBarImage = Ti.UI.createImageView({
	//image:IMAGE_PATH+'intro_login/bar/1.png',
	images:barImages,
	playcount:1,
	duration:15,
	bottom:0,
	zIndex:0
});

loadingBarImage.addEventListener('change', handleTimebarChange);

initialWindow.add(loadingBarImage);
loadingBarImage.start();

var initialButtonsBackground = Ti.UI.createView({
	width:272,
	height:107,
	top:230,
	visible:false,
	zIndex:1
});
initialWindow.add(initialButtonsBackground);

var registerButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/register_btn.png',
	width:134,
	height:52,
	top:0,
	right:1
});

initialButtonsBackground.add(registerButton);

registerButton.addEventListener('click', function(){
	
	_import('ui/iphone/register.js');
	var w = buildRegisterWindow();
	
	initialWindow.add(w);
	
	//Mark current view as open
	CURRENT_VIEW = VIEW_SIGNUP;
	w.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
	
});

var loginButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/login_btn.png',
	width:134,
	height:52,
	top:0,
	left:1
});

initialButtonsBackground.add(loginButton);

loginButton.addEventListener('click', function(){
	
	var loginWindow = buildLoginWindow(false);
	initialWindow.add(loginWindow);
	
	//Mark current view as open
	CURRENT_VIEW = VIEW_LOGIN;
	loginWindow.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

var takeTourButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/takeTheTour.png',
	width:272,
	height:52,
	bottom:0
});
initialButtonsBackground.add(takeTourButton);

takeTourButton.addEventListener('click', function(){
	
});

function handleTimebarChange(e){
	if(e.index == 56){
		loadingBarImage.pause();
		initialButtonsBackground.show();
	}
}
