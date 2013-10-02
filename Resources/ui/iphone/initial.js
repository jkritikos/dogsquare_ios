var initialWindow = Ti.UI.createWindow({
	backgroundImage:IMAGE_PATH+'intro_login/Default.png',
});

var initialWindowBackground = Ti.UI.createView({
	height:163,
	top:150,
	width:215,
	left:319
});

initialWindowBackground.animate({left:52,duration:800});

var registerButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/Register_button.png',
	width:175,
	height:56,
	bottom:0
});

initialWindowBackground.add(registerButton);

registerButton.addEventListener('click', function(){
	
	Ti.include('ui/iphone/register.js');
	var w = buildRegisterWindow();
	
	initialWindow.add(w);
	
	//Mark current view as open
	CURRENT_VIEW = VIEW_SIGNUP;
	w.open();
	
});

var loginButton = Ti.UI.createButton({
	backgroundImage:IMAGE_PATH+'intro_login/Login_button.png',
	width:175,
	height:56,
	top:45
});

initialWindowBackground.add(loginButton);
initialWindow.add(initialWindowBackground);

loginButton.addEventListener('click', function(){
	
	var loginWindow = buildLoginWindow(false);
	initialWindow.add(loginWindow);
	
	//Mark current view as open
	CURRENT_VIEW = VIEW_LOGIN;
	loginWindow.open();
});