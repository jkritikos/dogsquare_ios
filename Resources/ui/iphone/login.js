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
	var w = Ti.UI.createWindow({
		backButtonTitle:'back',
		title:'register',
		backgroundColor:UI_BACKGROUND_COLOR
	});
	
	var registerNavBar = Ti.UI.createImageView({
		image:IMAGE_PATH+'common/bar.png',
		top:0
	});
	
	var registerNavBarLabel = Ti.UI.createLabel({
		text:'Welcome',
		color:'white',
		font:UI_FONT_SEMIBOLD_NAVBAR
	})
	
	registerNavBar.add(registerNavBarLabel);
	
	w.add(registerNavBar);
	
	//Custom navbar
	var registerFormBorder = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/border.png',
		top:'12%'
	});
	
	w.add(registerFormBorder);
	
	//Profile pic selector
	var registerProfilePhotoButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/place_photo.png',
		width:109,
		height:91,
		top:'13%'
	});
	
	registerProfilePhotoButton.addEventListener('click', registerShowPhotoOptions);
	
	w.add(registerProfilePhotoButton);
	
	//Form scroll container
	var registerTxtFieldOffset = 35;
	var registerTxtFieldHeight = 34;
	var registerTxtFieldWidth = 192;
	var registerFormScrollBackground = Ti.UI.createScrollView({
		top:'32%',
		contentWidth: 'auto',
  		contentHeight: 'auto',
	});
	
	//Form background
	var registerFormBackground = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/fields_area.png',
		top:1
	});
	
	//Gender selector MALE label
	var registerGenderMaleLabel = Ti.UI.createLabel({
		text:'Male',
		top:11
	});
	
	//Gender selector FEMALE label
	var registerGenderFemaleLabel = Ti.UI.createLabel({
		text:'Female',
		top:14,
		right:19,
		color:'white',
		font:{fontSize:18, fontWeight:'semibold', fontFamily:'Open Sans'}
	});
	
	registerFormBackground.add(registerGenderFemaleLabel);
	
	//Gender selector sliding button
	var registerGenderSelectorSlider = Ti.UI.createImageView({
		image:IMAGE_PATH+'signup/Selected_genre.png',
		left:8,
		top:12
	});
	
	registerFormBackground.add(registerGenderSelectorSlider);
	
	//Name textfield
	var registerFieldName = Ti.UI.createTextField({
		hintText:'Name *',
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:46,
		backgroundColor:'red',
		returnKeyType: Ti.UI.RETURNKEY_NEXT
	});
	
	//Event listener for the name textfield
	registerFieldName.addEventListener('return', function() {
	    registerFieldEmail.focus();
	});
	
	registerFormBackground.add(registerFieldName);
	
	//Email textfield
	var registerFieldEmail = Ti.UI.createTextField({
		hintText:'Email address *',
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldName.top + registerTxtFieldOffset,
		backgroundColor:'red',
		keyboardType:Ti.UI.KEYBOARD_EMAIL,
		returnKeyType: Ti.UI.RETURNKEY_NEXT
	});
	
	//Event listener for the email textfield
	registerFieldEmail.addEventListener('return', function() {
	    registerFieldPassword.focus();
	});
	
	registerFormBackground.add(registerFieldEmail);
	
	//Password textfield
	var registerFieldPassword = Ti.UI.createTextField({
		hintText:'Password *',
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldEmail.top + registerTxtFieldOffset,
		backgroundColor:'red',
		passwordMask:true,
		returnKeyType: Ti.UI.RETURNKEY_NEXT
	});
	
	//Event listener for the password textfield
	registerFieldPassword.addEventListener('return', function() {
	    registerFieldAge.focus();
	});
	
	registerFormBackground.add(registerFieldPassword);
	
	//Age textfield
	var registerFieldAge = Ti.UI.createTextField({
		hintText:'Age',
		width:registerTxtFieldWidth,
		height:registerTxtFieldHeight,
		top:registerFieldPassword.top + registerTxtFieldOffset,
		backgroundColor:'red',
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	
	registerFormBackground.add(registerFieldAge);
	
	registerFormScrollBackground.add(registerFormBackground);
	w.add(registerFormScrollBackground);
	
	//Facebook button
	var registerFacebookButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/Facebook_button.png',
		width:241,
		height:45,
		bottom:5
	});
	
	w.add(registerFacebookButton);
	
	registerFacebookButton.addEventListener('click', function(){
		w.close();
		loginWindow.animate({opacity:0, duration:1}, function(){
			window.remove(loginWindow);
		});
	});

	//Signup button
	var registerSignupButton = Ti.UI.createButton({
		backgroundImage:IMAGE_PATH+'signup/sign_up_button.png',
		width:161,
		height:47,
		bottom:75
	});
	
	registerSignupButton.addEventListener('click', showProfileAfterUserSignup);
	
	w.add(registerSignupButton);
	
	loginWindow.add(w);
	w.open();
	
	function registerShowPhotoOptions(){
		var optionsDialogOpts = {
			options:['Take Photo', 'Choose From Library', 'Cancel'],
			cancel:2
		};
		
		var dialog = Titanium.UI.createOptionDialog(optionsDialogOpts);
		dialog.show();
	}
	
	//Validator for signup form
	function validateSignupForm(){
		//TODO translator integration here
		
		if(isStringNullOrEmpty(registerFieldName.value)){
			alert('NAME IS MISSING');
			return false;
		} else if(isStringNullOrEmpty(registerFieldEmail.value)){
			alert('EMAIL IS MISSING');
			return false;
		} else if(isStringNullOrEmpty(registerFieldPassword.value)){
			alert('PASSWORD IS MISSING');
			return false;
		}
		
		if(!isValidEmail(registerFieldEmail.value)){
			alert('INVALID EMAIL');
			return false;
		}
	}
	
	function showProfileAfterUserSignup(){
		if(validateSignupForm()){
			w.close();
			loginWindow.animate({opacity:0, duration:1}, function(){
				window.remove(loginWindow);
				leftTableView.fireEvent('click', {index:MENU_PROFILE});
			});
		}
		
	}	
});

var loginButton = Ti.UI.createButton({
	title:'Login',
	top:40
});

loginWindow.add(loginButton);