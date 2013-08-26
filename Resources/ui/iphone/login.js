var loginWindow = Ti.UI.createWindow({
	backgroundColor:'green',
	title:'login'
});

var closeButton = Ti.UI.createButton({
	title:'close',
});
			
loginWindow.add(closeButton);
			
closeButton.addEventListener('click', function(){
	loginWindow.animate({opacity:0, duration:250}, function(){
		window.remove(loginWindow);
	});
	
});

var registerButton = Ti.UI.createButton({
	title:'Register',
	bottom:30
});

loginWindow.add(registerButton);

registerButton.addEventListener('click', function(){
	
	Ti.include('ui/iphone/register.js');
	var w = buildRegisterWindow();
	
	
	
	
	loginWindow.add(w);
	
	//Mark current view as open
	currentDogView = VIEW_SIGNUP;
	w.open();
	
});

var loginButton = Ti.UI.createButton({
	title:'Login',
	top:40
});

loginWindow.add(loginButton);