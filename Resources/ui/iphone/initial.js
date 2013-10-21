var initialWindow = Ti.UI.createWindow({
	backgroundImage:IMAGE_PATH+'intro_login/Default.png'
});

var registerButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/register_btn.png',
	width:156,
	height:50,
	top:230,
	right:2
});

initialWindow.add(registerButton);

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
	width:156,
	height:50,
	top:230,
	left:1
});

initialWindow.add(loginButton);

loginButton.addEventListener('click', function(){
	
	var loginWindow = buildLoginWindow(false);
	initialWindow.add(loginWindow);
	
	//Mark current view as open
	CURRENT_VIEW = VIEW_LOGIN;
	loginWindow.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

var takeTourButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/takeTheTour.png',
	width:320,
	height:49,
	top:285
});
initialWindow.add(takeTourButton);

takeTourButton.addEventListener('click', function(){
	
});

var gradientImage = Ti.UI.createImageView({
	image:IMAGE_PATH+'intro_login/gradient.png',
	bottom:0,
	width:320,
	right:320
});
initialWindow.add(gradientImage);

gradientImage.animate({right:0, duration:800});
