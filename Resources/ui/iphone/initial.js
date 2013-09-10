var initialWindow = Ti.UI.createWindow({
	backgroundColor:'green',
	title:'initial'
});

var closeButton = Ti.UI.createButton({
	title:'close',
});
			
initialWindow.add(closeButton);
			
closeButton.addEventListener('click', function(){
	initialWindow.animate({opacity:0, duration:250}, function(){
		window.remove(initialWindow);
	});
	
});

var registerButton = Ti.UI.createButton({
	title:'Register',
	bottom:30
});

initialWindow.add(registerButton);

registerButton.addEventListener('click', function(){
	
	Ti.include('ui/iphone/register.js');
	var w = buildRegisterWindow();
	
	initialWindow.add(w);
	
	//Mark current view as open
	currentDogView = VIEW_SIGNUP;
	w.open();
	
});

var loginButton = Ti.UI.createButton({
	title:'Login',
	top:40
});

initialWindow.add(loginButton);

loginButton.addEventListener('click', function(){
	
	Ti.include('ui/iphone/login.js');
	var loginWindow = buildLoginWindow();
	
	initialWindow.add(loginWindow);
	
	loginWindow.open();
});